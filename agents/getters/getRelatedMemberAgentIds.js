import { createSelector } from 'reselect'
import { propEq, find, isNil, isEmpty, filter, pipe, prop, map, tap } from 'ramda'

import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsForThisAgent,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return
    if (isEmpty(relationships)) return
    const getTargetIds = map(prop('targetId'))
    const filterMemberRelationships = n => n.sourceId === relatedAgent.id && n.relationshipType === 'member'
    const memberRelationships = filter(filterMemberRelationships, relationships)
    return getTargetIds(memberRelationships)
  }
)
