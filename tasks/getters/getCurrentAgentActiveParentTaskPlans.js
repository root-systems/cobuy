import { createSelector } from 'reselect'
import { filter } from 'ramda'

import getActiveParentTaskPlans from './getActiveParentTaskPlans'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

const getCurrentAgentActiveParentTaskPlans = createSelector(
  getActiveParentTaskPlans,
  getCurrentAgent,
  (activeParentTaskPlans, currentAgent) => {
    const belongsToCurrentAgent = n => n.assigneeId === currentAgent.id
    return filter(belongsToCurrentAgent, activeParentTaskPlans)
  }
)

export default getCurrentAgentActiveParentTaskPlans
