import { createSelector } from 'reselect'
import { isNil, pipe, values, map, prop, path, merge, indexBy, groupBy } from 'ramda'

import { orderStatuses, getOrderStatus, getTaskPlansByStatus } from '../util/orderStatuses'
import getOrdersState from './getOrdersState'
import { getAgents } from 'dogstack-agents/getters'
import getTaskPlans from '../../tasks/getters/getTaskPlans'

const orderStatusNames = map(prop('name'), orderStatuses)

const getTaskPlansByOrderRecipe = createSelector(
  getTaskPlans,
  pipe(
    values,
    groupBy(path(['params', 'orderId'])),
    map(indexBy(prop('taskRecipeId')))
  )
)

export default createSelector(
  getOrdersState,
  getAgents,
  getTaskPlansByOrderRecipe,
  (orders, agents, taskPlansByOrderRecipe) => {
    const mapOrders = map(order => {
      const taskPlansByRecipe = taskPlansByOrderRecipe[order.id]
      const status = getOrderStatus({ order, taskPlansByRecipe })
      const stepIndex = orderStatusNames.indexOf(status)
      const taskPlansByStatus = getTaskPlansByStatus({ order, taskPlansByRecipe })

      const steps = orderStatuses.map((orderStatus, index) => ({
        name: orderStatus.name,
        description: orderStatus.description,
        Icon: orderStatus.Icon,
        index,
        taskPlan: taskPlansByStatus[orderStatus.name],
        completed: status && index < stepIndex,
        ready: status && index === stepIndex,
        hint: orderStatus.hint
      }))

      const consumerAgent = agents[order.consumerAgentId]
      const supplierAgent = agents[order.supplierAgentId]
      const adminAgent = agents[order.adminAgentId]

      return merge(order, {
        status,
        steps,
        stepIndex,
        consumerAgent,
        supplierAgent,
        adminAgent
      })
    })
    return mapOrders(orders)
  }
)
