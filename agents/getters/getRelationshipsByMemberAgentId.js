import { createSelector } from 'reselect'
import { map, filter, values, concat, isNil, isEmpty, groupBy, prop } from 'ramda'

import getRelationshipsState from './getRelationshipsState'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsState,
  (relatedAgent, relationships) => {
    console.log('getter')
    if (isNil(relatedAgent)) return []
    if (isEmpty(relationships)) return []
    console.log('relatedAgent', relatedAgent)
    console.log('relationships', relationships)
    const isRelated = n => n.sourceId === relatedAgent.id && n.relationshipType === 'member'
    const memberRelationships = values(filter(isRelated, relationships))
    const groupByTargetId = groupBy(prop('targetId'))
    console.log('getter result', groupByTargetId(memberRelationships))
    return groupByTargetId(memberRelationships)
  }
)
