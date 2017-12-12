import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getCurrentOrder from './getCurrentOrder'
import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'

const getOrderPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans,
  order: getCurrentOrder
})

export default getOrderPageProps
