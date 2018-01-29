import { createSelector } from 'reselect'
import { map, filter, values, concat } from 'ramda'

import getRelationshipsState from './getRelationshipsState'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsState,
  (relatedAgent, relationships) => {
    const isRelated = n => n.targetId === relatedAgent.id || n.sourceId === relatedAgent.id
    return values(filter(isRelated, relationships))
  }
)
