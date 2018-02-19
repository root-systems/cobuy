import { connect } from 'feathers-action-react'
import { pipe, prop, values, map } from 'ramda'
import {
  createSelector,
  createStructuredSelector
} from 'reselect'

import OrdersPage from '../components/OrdersPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import { agents as agentActions, profiles as profileActions, relationships as relationshipActions } from 'dogstack-agents/actions'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'
import getOrdersForCurrentAgent from '../getters/getOrdersForCurrentAgent'
import getOrders from '../getters/getOrders'
import { getAgentIdsForCurrentAgentOrders, getConsumerAgentIdsForCurrentAgentOrders } from '../getters/getOrderAgentIds'

const getIds = pipe(values, map(prop('id')))

export default connect({
  selector: createStructuredSelector({
    currentAgent: getCurrentAgent,
    taskPlans: getActiveParentTaskPlans,
    orders: getOrdersForCurrentAgent,
    allOrders: getOrders
  }),
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    agents: agentActions,
    profiles: profileActions,
    relationships: relationshipActions
  },
  query: [
    {
      name: 'orders',
      service: 'orders',
      params: {}
    },
    {
      name: 'orderAgents',
      service: 'agents',
      dependencies: [
        'orders'
      ],
      params: createSelector(
        getAgentIdsForCurrentAgentOrders,
        (agentIds) => ({
          query: {
            id: {
              $in: agentIds
            }
          }
        })
      ),
    },
    {
      name: 'orderAgentProfiles',
      service: 'profiles',
      dependencies: [
        'orders'
      ],
      params: createSelector(
        getAgentIdsForCurrentAgentOrders,
        (agentIds) => ({
          query: {
            agentId: {
              $in: agentIds
            }
          }
        })
      )
    },
    {
      name: 'orderRelationships',
      service: 'relationships',
      dependencies: [
        'orders'
      ],
      params: createSelector(
        getConsumerAgentIdsForCurrentAgentOrders,
        (consumerAgentIds) => ({
          query: {
            sourceId: {
              $in: consumerAgentIds
            },
            relationshipType: {
              $in: ['member', 'admin', 'supplier']
            }
          }
        })
      )
    },
    {
      name: 'orderTasksPlans',
      service: 'taskPlans',
      dependencies: [
        'orders'
      ],
      params: createSelector(
        getOrdersForCurrentAgent,
        pipe(
          getIds,
          (orderIds) => ({
            query: {
              orderId: {
                $in: orderIds
              }
            }
          })
        )
      )
    },
    {
      name: 'orderTaskWorks',
      service: 'taskWorks',
      dependencies: [
        'orders'
      ],
      // TODO search for only relevant task works
      params: {
        query: {
        }
      }
    }
  ]
})(OrdersPage)
