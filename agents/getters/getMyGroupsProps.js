import { createStructuredSelector } from 'reselect'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'
import getCurrentAgentGroupProfiles from './getCurrentAgentGroupProfiles'
import getCurrentAgentGroupSupplierIds from './getCurrentAgentGroupSupplierIds'
import getCurrentAgentGroupSupplierProfiles from './getCurrentAgentGroupSupplierProfiles'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentAgentGroupIds: getCurrentAgentGroupIds,
  currentAgentGroupProfiles: getCurrentAgentGroupProfiles,
  currentAgentGroupSupplierIds: getCurrentAgentGroupSupplierIds,
  currentAgentGroupSupplierProfiles: getCurrentAgentGroupSupplierProfiles
})
