import { connect } from 'feathers-action-react'
import { push } from 'react-router-redux'
import {
  createSelector,
  createStructuredSelector
} from 'reselect'

import OrderPage from '../components/OrderPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import { agents as agentActions, profiles as profileActions, relationships as relationshipActions } from 'dogstack-agents/actions'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrderId from '../getters/getCurrentOrderId'
import getCurrentOrder from '../getters/getCurrentOrder'
import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'

import { getAgentIdsForCurrentOrder, getConsumerAgentIdForCurrentOrder } from '../getters/getOrderAgentIds'

export default connect({
  selector: createStructuredSelector({
    currentAgent: getCurrentAgent,
    taskPlans: getActiveParentTaskPlans,
    order: getCurrentOrder
  }),
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    agents: agentActions,
    profiles: profileActions,
    relationships: relationshipActions,
    // `feathers-action-react` wraps every
    //  action creator in a cid creator.
    router: {
      push: (cid, ...args) => push(...args)
    }
  },
  query: [
    {
      name: 'order',
      service: 'orders',
      id: getCurrentOrderId,
      params: {}
    },
    {
      name: 'orderAgents',
      service: 'agents',
      dependencies: [
        'order'
      ],
      params: createSelector(
        getAgentIdsForCurrentOrder,
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
        'order'
      ],
      params: createSelector(
        getAgentIdsForCurrentOrder,
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
        'order'
      ],
      params: createSelector(
        getConsumerAgentIdForCurrentOrder,
        (consumerAgentId) => ({
          query: {
            sourceId: consumerAgentId,
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
        'order'
      ],
      params: createSelector(
        getCurrentOrderId,
        (orderId) => ({
          query: {
            orderId
          }
        })
      )
    },
    {
      name: 'orderTaskWorks',
      service: 'taskWorks',
      dependencies: [
        'order'
      ],
      // TODO search for only relevant task works
      params: {
        query: {
        }
      }
    }
  ]
})(OrderPage)
