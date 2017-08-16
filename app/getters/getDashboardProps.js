import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getParentTaskPlans from '../../tasks/getters/getParentTaskPlans'

const getDashboardProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getParentTaskPlans
})

export default getDashboardProps
