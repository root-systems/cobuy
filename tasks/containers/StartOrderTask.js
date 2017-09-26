import { isNil, path, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../../ordering/dux/orders'
import { agents, relationships, profiles } from 'dogstack-agents/actions'

import getStartOrderTaskProps from '../getters/getStartOrderTaskProps'
import StartOrderTask from '../components/StartOrderTask'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])

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
      const { currentAgent, currentAgentGroupIds, currentAgentGroupSupplierIds, currentAgentGroupMemberIds } = selected

      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orders',
          id: orderId
        })
      }

      if (currentAgent) {
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: currentAgent.id
            }
          }
        })
      }

      if (currentAgentGroupIds) {
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
        // get suppliers with a relationship to any groups of the currentAgent
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: {
                $in: currentAgentGroupIds
              }
            }
          }
        })
        // get members with a relationship to any groups of the currentAgent
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: {
                $in: currentAgentGroupIds
              }
            }
          }
        })
      }

      if (currentAgentGroupSupplierIds) {
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

      if (currentAgentGroupMemberIds) {
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

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps
      const {
        currentAgent,
        relationships,
        currentAgentGroupIds,
        currentAgentGroupProfiles,
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

      if (isEmpty(currentAgentGroupProfiles)) return true

      if (isEmpty(currentAgentGroupSupplierIds)) return true

      if (isEmpty(currentAgentGroupSupplierProfiles)) return true

      // TODO: IK: not sure how we should do this one, given the currentAgent is always part of currentAgentGroupMemberIds
      // but they also could legitimately be the only one
      // if (isEmpty(currentAgentGroupMemberIds)) return true

      // if (isEmpty(currentAgentGroupMemberProfiles)) return true

      return false
    }
  })
)(StartOrderTask)
