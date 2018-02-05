import { createSelector } from 'reselect'
import { map, filter, values, concat, isNil, isEmpty, indexBy, prop } from 'ramda'

import getRelationships from './getRelationships'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationships,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return []
    if (isEmpty(relationships)) return []
    const isRelated = n => n.sourceId === relatedAgent.id && n.relationshipType === 'member'
    const memberRelationships = filter(isRelated, relationships)
    const groupByTargetId = indexBy(prop('targetId'))
    return groupByTargetId(memberRelationships)
  }
)
