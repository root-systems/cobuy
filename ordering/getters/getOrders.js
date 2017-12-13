import { createSelector } from 'reselect'
import { map, merge, prop, indexBy, values, pipe } from 'ramda'

import getOrdersState from './getOrdersState'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getOrdersState,
  getAgents,
  (orders, agents) => {
    const mapOrders = map(order => {
      const consumerAgent = agents[order.consumerAgentId]
      const supplierAgent = agents[order.supplierAgentId]
      const adminAgent = agents[order.adminAgentId]
      return merge(order, {
        consumerAgent,
        supplierAgent,
        adminAgent
      })
    })
    return mapOrders(orders)
  }
)
