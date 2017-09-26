import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getRelationships from 'dogstack-agents/relationships/getters/getRelationships'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'

const getCurrentAgentGroupMemberIds = createSelector(
  getRelationships,
  getCurrentAgentGroupIds,
  (relationships, groupIds) => {
    const getMemberIds = map(prop('sourceId'))
    const memberRelationships = getMemberIds(filter((relationship) => {
      return contains(relationship.targetId, groupIds)
    }, relationships))
    return values(memberRelationships)
  }
)

export default getCurrentAgentGroupMemberIds
