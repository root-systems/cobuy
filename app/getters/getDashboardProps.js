import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getActiveTaskPlans from '../../tasks/getters/getActiveTaskPlans'

const getDashboardProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveTaskPlans
})

export default getDashboardProps
