import { createStructuredSelector } from 'reselect'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentTaskPlan from './getCurrentTaskPlan'

export default createStructuredSelector({
  taskPlan: getCurrentTaskPlan,
  currentAgent: getCurrentAgent
})
