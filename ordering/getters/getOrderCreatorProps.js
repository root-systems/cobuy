import { createStructuredSelector } from 'reselect'
import getOrders from './getOrders'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentAgentGroupIds from '../../agents/getters/getCurrentAgentGroupIds'
import getCurrentAgentGroupSupplierIds from '../../agents/getters/getCurrentAgentGroupSupplierIds'
import getCurrentAgentGroupMemberIds from '../../agents/getters/getCurrentAgentGroupMemberIds'
import getCurrentAgentGroupProfiles from '../../agents/getters/getCurrentAgentGroupProfiles'
import getCurrentAgentGroupSupplierProfiles from '../../agents/getters/getCurrentAgentGroupSupplierProfiles'
import getCurrentAgentGroupMemberProfiles from '../../agents/getters/getCurrentAgentGroupMemberProfiles'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  orders: getOrders,
  currentAgentGroupIds: getCurrentAgentGroupIds,
  currentAgentGroupSupplierIds: getCurrentAgentGroupSupplierIds,
  currentAgentGroupMemberIds: getCurrentAgentGroupMemberIds,
  currentAgentGroupProfiles: getCurrentAgentGroupProfiles,
  currentAgentGroupSupplierProfiles: getCurrentAgentGroupSupplierProfiles,
  currentAgentGroupMemberProfiles: getCurrentAgentGroupMemberProfiles
})
