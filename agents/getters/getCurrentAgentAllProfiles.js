import { createSelector } from 'reselect'

import { concat } from 'ramda'

import getCurrentAgentGroupProfiles from './getCurrentAgentGroupProfiles'
import getCurrentAgentSupplierProfiles from './getCurrentAgentSupplierProfiles'

export default createSelector(
  getCurrentAgentGroupProfiles,
  getCurrentAgentSupplierProfiles,
  (buyingGroups, supplierGroups) => {
    return concat(buyingGroups, supplierGroups)
  }
)
