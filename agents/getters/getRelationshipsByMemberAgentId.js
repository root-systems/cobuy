import { createSelector } from 'reselect'
import { map, filter, values, concat, isNil, isEmpty, groupBy, prop } from 'ramda'

import getRelationshipsState from './getRelationshipsState'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsState,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return []
    if (isEmpty(relationships)) return []
    const isRelated = n => n.sourceId === relatedAgent.id && n.relationshipType === 'member'
    const memberRelationships = values(filter(isRelated, relationships))
    const groupByTargetId = groupBy(prop('targetId'))
    console.log('getter result', groupByTargetId(memberRelationships))
    return groupByTargetId(memberRelationships)
  }
)
