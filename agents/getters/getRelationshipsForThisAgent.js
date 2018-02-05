import { createSelector } from 'reselect'
import { map, filter, values, concat, isNil, isEmpty } from 'ramda'

import getRelationshipsState from './getRelationshipsState'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsState,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return []
    if (isEmpty(relationships)) return []
    const isRelated = n => n.targetId === relatedAgent.id || n.sourceId === relatedAgent.id
    return values(filter(isRelated, relationships))
  }
)
