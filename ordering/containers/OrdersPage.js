import { connect } from 'feathers-action-react'
import { createSelector } from 'reselect'
import { isNil, forEach, isEmpty, prop, groupBy, pipe, either, values, map, unnest, uniq, props, equals } from 'ramda'

import OrdersPage from '../components/OrdersPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import { agents as agentActions, profiles as profileActions, relationships as relationshipActions } from 'dogstack-agents/actions'
import getOrdersPageProps from '../getters/getOrdersPageProps'
import getOrdersByCurrentAgent from '../getters/getOrdersByCurrentAgent'

const getConsumerAgentIdsFromOrders = pipe(
  values,
  map(prop('consumerAgentId')),
  uniq
)

const getOrderConsumerAgentIds = createSelector(
  getOrdersByCurrentAgent,
  getConsumerAgentIdsFromOrders
)

const getAgentIdsFromOrders = pipe(
  values,
  map(props(['consumerAgentId', 'supplierAgentId', 'adminAgentId'])),
  unnest,
  uniq
)

const getOrderAgentIds = createSelector(
  getOrdersByCurrentAgent,
  getAgentIdsFromOrders
)

const getIds = pipe(values, map(prop('id')))

const getOrderIds = createSelector(
  getOrdersByCurrentAgent,
  getIds
)

export default connect({
  selector: getOrdersPageProps,
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
      params: pipe(
        getOrderAgentIds,
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
      params: pipe(
        getOrderAgentIds,
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
      params: pipe(
        getOrderConsumerAgentIds,
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
      params: pipe(
        getOrderIds,
        (orderIds) => ({
          query: {
            orderId: {
              $in: orderIds
            }
          }
        })
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
