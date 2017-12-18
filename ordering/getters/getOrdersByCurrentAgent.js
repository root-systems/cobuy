import { createSelector } from 'reselect'
import { filter, contains } from 'ramda'

import getCurrentAgentGroupIds from '../../agents/getters/getCurrentAgentGroupIds'
import getCurrentAgentId from 'dogstack-agents/agents/getters/getCurrentAgentId'
import getOrders from './getOrders'

const getOrdersByCurrentAgent = createSelector(
  getCurrentAgentGroupIds,
  getOrders,
  getCurrentAgentId,
  (groupIds, orders, currentAgentId) => {
    return filter((order) => {
      const { adminAgentId, consumerAgentId } = order
      return (adminAgentId === currentAgentId || contains(consumerAgentId, groupIds))
    }, orders
    )
  }
)

export default getOrdersByCurrentAgent
