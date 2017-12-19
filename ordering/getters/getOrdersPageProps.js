import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'
import getOrdersByCurrentAgent from './getOrdersByCurrentAgent'

const getOrdersPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans,
  orders: getOrdersByCurrentAgent
})

export default getOrdersPageProps
