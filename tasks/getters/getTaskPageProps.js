import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getCurrentAgentActiveParentTaskPlans from './getCurrentAgentActiveParentTaskPlans'

const getDashboardProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getCurrentAgentActiveParentTaskPlans
})

export default getDashboardProps
