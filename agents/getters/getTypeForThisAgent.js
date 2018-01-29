import { createSelector } from 'reselect'
import { map, filter, values, any, propEq, and, isNil, isEmpty } from 'ramda'

import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'
import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  getRelationshipsForThisAgent,
  (relatedAgent, relationships) => {
    if (isNil(relatedAgent)) return null
    if (isEmpty(relationships)) return null

    const isSupplierGroupRelationship = n => n.relationshipType === 'supplier' && n.targetId === relatedAgent.id
    const isBuyingGroupRelationship = n => n.sourceId === relatedAgent.id
    const isMemberRelationship = n => n.relationshipType === 'member' && n.targetId === relatedAgent.id

    const hasSupplierRelationship = any(isSupplierGroupRelationship)(relationships)
    const hasBuyingGroupRelationship = any(isBuyingGroupRelationship)(relationships)
    const hasMemberRelationship = any(isMemberRelationship)(relationships)

    if (hasSupplierRelationship) {
      return 'supplier'
    } else if (hasBuyingGroupRelationship) {
      return 'group'
    } else if (hasMemberRelationship) {
      return 'my'
    } else {
      return 'my'
    }
  }
)
