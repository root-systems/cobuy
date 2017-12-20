import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'
import getOrdersByCurrentAgent from './getOrdersByCurrentAgent'
import getOrders from './getOrders'

const getOrdersPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans,
  orders: getOrdersByCurrentAgent,
  allOrders: getOrders
})

export default getOrdersPageProps
