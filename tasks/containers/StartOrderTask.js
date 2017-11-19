import { isNil, path, isEmpty, pipe, any, prop, difference, keys, tap, not, map } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../../ordering/dux/orders'
import { agents, relationships, profiles } from 'dogstack-agents/actions'

import getStartOrderTaskProps from '../getters/getStartOrderTaskProps'
import StartOrderTask from '../components/StartOrderTask'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])
const getIdsFromProfiles = map(prop('id'))

/*
queries:
- get all groups the currentUser is either an admin or member of
- get all suppliers for all of those groups
- get all members for all of those groups (to potentially be the admin for the order)
- then for steps 2 & 3, filter the data based on the group selected in step 1
*/

export default compose(
  connectFeathers({
    selector: getStartOrderTaskProps,
    actions: {
      orders,
      agents,
      relationships,
      profiles
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentAgent, currentAgentGroupIds, currentAgentGroupSupplierIds, currentAgentGroupSupplierProfiles, currentAgentGroupMemberIds, currentAgentGroupMemberProfiles } = selected

      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orders',
          id: orderId
        })
      }

      // get groups and profiles currentAgent is part of
      if (currentAgent) {
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: currentAgent.id,
              relationshipType: {
                $in: ['member', 'admin']
              }
            }
          }
        })

        if (!isEmpty(currentAgentGroupIds)) {
          // get members / suppliers with a relationship to any groups of the currentAgent
          queries.push({
            service: 'relationships',
            params: {
              query: {
                sourceId: {
                  $in: currentAgentGroupIds
                },
                relationshipType: {
                  $in: ['member', 'supplier']
                }
              }
            }
          })
        }

        if (currentAgentMissingAnyGroupProfiles(currentAgent)) {
          queries.push({
            service: 'profiles',
            params: {
              query: {
                agentId: {
                  $in: currentAgentGroupIds
                }
              }
            }
          })
        }

        if (missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles))) {
          queries.push({
            service: 'profiles',
            params: {
              query: {
                agentId: {
                  $in: currentAgentGroupSupplierIds
                }
              }
            }
          })
        }

        if (missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))) {
          queries.push({
            service: 'profiles',
            params: {
              query: {
                agentId: {
                  $in: currentAgentGroupMemberIds
                }
              }
            }
          })
        }
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps
      const {
        currentAgent,
        currentAgentGroupIds,
        currentAgentGroupSupplierIds,
        currentAgentGroupSupplierProfiles,
        currentAgentGroupMemberIds,
        currentAgentGroupMemberProfiles
      } = props.selected

       // wait for task plan before re-query
      if (isNil(taskPlan)) return false

       // re-query when we haven't gotten back supplierAgent or taskWork
      const orderId = getOrderIdFromTaskPlan(taskPlan)

      if (isNil(orderId)) return true

      if (isNil(currentAgent)) return true
      if (isEmpty(currentAgentGroupIds)) return true

      if (currentAgentMissingAnyGroupProfiles(currentAgent)) return true

      if (missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles))) return true

      if (missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))) return true

      return false
    }
  })
)(StartOrderTask)

const currentAgentMissingAnyGroupProfiles = pipe(
  prop('groups'),
  any(
    pipe(
      path(['agent', 'profile']),
      isNil
    )
  )
)

const missingAnyProfiles = pipe(
  difference,
  isEmpty,
  not
)
