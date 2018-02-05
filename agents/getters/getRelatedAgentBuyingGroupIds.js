import { createSelector } from 'reselect'
import { propEq, find, isNil, isEmpty, filter, pipe, prop, map, tap } from 'ramda'

import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsForThisAgent,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return []
    if (isEmpty(relationships)) return []
    const getSourceIds = map(prop('sourceId'))
    const filterBuyingGroupRelationships = n => n.targetId === relatedAgent.id && n.relationshipType === 'member'
    const buyingGroupRelationships = filter(filterBuyingGroupRelationships, relationships)
    return getSourceIds(buyingGroupRelationships)
  }
)
