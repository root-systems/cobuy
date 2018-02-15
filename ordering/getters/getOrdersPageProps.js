import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'
import getOrdersForCurrentAgent from './getOrdersForCurrentAgent'
import getOrders from './getOrders'

const getOrdersPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans,
  orders: getOrdersForCurrentAgent,
  allOrders: getOrders
})

export default getOrdersPageProps
