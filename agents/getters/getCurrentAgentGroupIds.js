import { createSelector } from 'reselect'
import { filter, map, prop, values } from 'ramda'

import getRelationships from 'dogstack-agents/relationships/getters/getRelationships'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

const getCurrentAgentGroupIds = createSelector(
  getCurrentAgent,
  (currentAgent) => {
    if (!currentAgent) return []
    return map(prop('agentId'), currentAgent.groups)
  }
)

export default getCurrentAgentGroupIds
