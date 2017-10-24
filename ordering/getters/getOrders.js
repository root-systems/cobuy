import { createSelector } from 'reselect'
import { map, merge, prop, indexBy, values, pipe } from 'ramda'

import getOrdersState from './getOrdersState'
import { getProfiles } from 'dogstack-agents/getters'

export default createSelector(
  getOrdersState,
  getProfiles,
  (orders, profiles) => {
    const profilesByAgent = pipe(values, indexBy(prop('agentId')))(profiles)
    const mapOrders = map(order => {
      const consumerAgent = profilesByAgent[order.consumerAgentId]
      const supplierAgent = profilesByAgent[order.supplierAgentId]
      const adminAgent = profilesByAgent[order.adminAgentId]
      return merge(order, {
        consumerAgent,
        supplierAgent,
        adminAgent
      })
      return order
    })
    return mapOrders(orders)
  }
)
