import { createSelector } from 'reselect'
import { filter, contains, __ } from 'ramda'

import getCurrentAgentGroupIds from '../../agents/getters/getCurrentAgentGroupIds'
import getCurrentAgentId from 'dogstack-agents/agents/getters/getCurrentAgentId'
import getOrders from './getOrders'

const getOrdersForCurrentAgent = createSelector(
  getCurrentAgentGroupIds,
  getOrders,
  getCurrentAgentId,
  (groupIds, orders, currentAgentId) => {
    const isConsumerGroupForCurrentAgent = contains(__, groupIds)
    const filterOnlyCurrentAgentOrders = filter((order) => {
      const { adminAgentId, consumerAgentId } = order
      return (
        adminAgentId === currentAgentId ||
        isConsumerGroupForCurrentAgent(consumerAgentId)
      )
    })
    return filterOnlyCurrentAgentOrders(orders)
  }
)

export default getOrdersForCurrentAgent
