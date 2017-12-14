import { createSelector } from 'reselect'
import { pipe, values, map, prop, path, merge, indexBy, groupBy } from 'ramda'

import getOrdersState from './getOrdersState'
import { getAgents } from 'dogstack-agents/getters'
import getTasks from '../../tasks/getters/getTaskPlans'

const getTasksByOrderRecipe = createSelector(
  getTasks,
  pipe(
    values,
    groupBy(path(['params', 'orderId'])),
    map(indexBy(prop('taskRecipeId')))
  )
)

export default createSelector(
  getOrdersState,
  getAgents,
  getTasksByOrderRecipe,
  (orders, agents, tasksByOrderRecipe) => {
    const mapOrders = map(order => {
      const tasksByRecipe = tasksByOrderRecipe[order.id]
      console.log(order, tasksByRecipe)
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


