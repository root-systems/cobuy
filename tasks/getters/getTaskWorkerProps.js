import { createStructuredSelector } from 'reselect'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentTaskPlan from './getCurrentTaskPlan'
import getFeathersData from './getFeathersData'

export default createStructuredSelector({
  taskPlan: getCurrentTaskPlan,
  currentAgent: getCurrentAgent,
  feathersData: getFeathersData
})
