import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getRelationships from 'dogstack-agents/relationships/getters/getRelationships'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'

const getCurrentAgentGroupSupplierIds = createSelector(
  getRelationships,
  getCurrentAgentGroupIds,
  (relationships, groupIds) => {
    const getSupplierIds = map(prop('targetId'))
    const supplierRelationships = getSupplierIds(filter((relationship) => {
      return contains(relationship.sourceId, groupIds) && relationship.relationshipType === 'supplier'
    }, relationships))
    return values(supplierRelationships)
  }
)

export default getCurrentAgentGroupSupplierIds
