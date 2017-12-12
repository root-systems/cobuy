import h from 'react-hyperscript'
import { isNil, merge, path, isEmpty, pipe, any, prop, difference, keys, tap, not, map } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../dux/orders'
import { agents, relationships, profiles } from 'dogstack-agents/actions'

import getOrderCreatorProps from '../getters/getOrderCreatorProps'
import OrderCreator from '../components/OrderCreator'

import currentAgentMissingAnyGroupProfiles from '../../tasks/util/currentAgentMissingAnyGroupProfiles'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])
const getIdsFromProfiles = map(prop('id'))
const missingAnyProfiles = pipe(
  difference,
  isEmpty,
  not
)

/*
queries:
- get all groups the currentUser is either an admin or member of
- get all suppliers for all of those groups
- get all members for all of those groups (to potentially be the admin for the order)
- then for steps 2 & 3, filter the data based on the group selected in step 1
*/

export default compose(
  connectFeathers({
    selector: getOrderCreatorProps,
    actions: {
      orders,
      agents,
      relationships,
      profiles
    },
    query: (props) => {
      var queries = []
      const { selected } = props
      const { currentAgent, currentAgentGroupIds, currentAgentGroupSupplierIds, currentAgentGroupSupplierProfiles, currentAgentGroupMemberIds, currentAgentGroupMemberProfiles } = selected

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

      const {
        currentAgent,
        currentAgentGroupIds,
        currentAgentGroupSupplierIds,
        currentAgentGroupSupplierProfiles,
        currentAgentGroupMemberIds,
        currentAgentGroupMemberProfiles
      } = props.selected

      if (isNil(currentAgent)) return false
      //if (isNil(currentAgent)) return true // INFINITE LOOP

      if (isEmpty(currentAgentGroupIds)) return true

      if (currentAgentMissingAnyGroupProfiles(currentAgent)) return true

      if (missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles))) return true

      if (missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))) return true

      return false
    }
  })
)(OrderCreatorContainer)

function OrderCreatorContainer (props) {
  const { actions } = props

  function handleSubmit (values) {
    if (values.consumerAgentId === 'NEW_CONSUMER') values.consumerAgentId = null
    if (values.supplierAgentId === 'NEW_SUPPLIER') values.supplierAgentId = null
    actions.orders.create(values)
  } 

  const nextProps = merge(props, {
    onSubmit: handleSubmit
  })

  return h(OrderCreator, nextProps)
}
