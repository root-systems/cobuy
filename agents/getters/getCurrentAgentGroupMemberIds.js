import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getRelationships from 'dogstack-agents/relationships/getters/getRelationships'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'

const getCurrentAgentGroupMemberIds = createSelector(
  getRelationships,
  getCurrentAgentGroupIds,
  (relationships, groupIds) => {
    const getMemberIds = map(prop('targetId'))
    const memberRelationships = getMemberIds(filter((relationship) => {
      return contains(relationship.sourceId, groupIds) && relationship.relationshipType === 'member'
    }, relationships))
    return values(memberRelationships)
  }
)

export default getCurrentAgentGroupMemberIds
