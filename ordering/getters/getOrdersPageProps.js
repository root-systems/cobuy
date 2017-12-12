import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getOrders from './getOrders'
import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'

const getOrdersPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans,
  orders: getOrders
})

export default getOrdersPageProps
