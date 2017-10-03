import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getProfiles from 'dogstack-agents/profiles/getters/getProfiles'
import getCurrentAgentGroupSupplierIds from './getCurrentAgentGroupSupplierIds'

const getCurrentAgentGroupSupplierProfiles = createSelector(
  getProfiles,
  getCurrentAgentGroupSupplierIds,
  (profiles, supplierIds) => {
    const supplierProfiles = filter((profile) => {
      return contains(profile.agentId, supplierIds)
    }, profiles)
    return values(supplierProfiles)
  }
)

export default getCurrentAgentGroupSupplierProfiles
