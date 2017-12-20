import { createSelector } from 'reselect'
import { map, prop } from 'ramda'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

const getCurrentAgentGroupIds = createSelector(
  getCurrentAgent,
  (currentAgent) => {
    if (!currentAgent) return []
    return map(prop('agentId'), currentAgent.groups)
  }
)

export default getCurrentAgentGroupIds
