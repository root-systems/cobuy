import { createSelector } from 'reselect'
import { filter, map, prop, values } from 'ramda'

import getRelationships from 'dogstack-agents/relationships/getters/getRelationships'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

const getCurrentAgentGroupIds = createSelector(
  getRelationships,
  getCurrentAgent,
  (relationships, currentAgent) => {
    const getGroupIds = map(prop('targetId'))
    const groupRelationships = getGroupIds(filter((relationship) => {
      return relationship.sourceId === currentAgent.id // TODO: IK: possibly also specify relationshipType is admin or member
    }, relationships))
    return values(groupRelationships)
  }
)

export default getCurrentAgentGroupIds
