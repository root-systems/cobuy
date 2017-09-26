import { createStructuredSelector } from 'reselect'
import getOrders from '../../ordering/getters/getOrders'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentAgentGroupIds from '../../agents/getters/getCurrentAgentGroupIds'
import getCurrentAgentGroupSupplierIds from '../../agents/getters/getCurrentAgentGroupSupplierIds'
import getCurrentAgentGroupProfiles from '../../agents/getters/getCurrentAgentGroupProfiles'
import getCurrentAgentGroupSupplierProfiles from '../../agents/getters/getCurrentAgentGroupSupplierProfiles'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  orders: getOrders,
  currentAgentGroupIds: getCurrentAgentGroupIds,
  currentAgentGroupSupplierIds: getCurrentAgentGroupSupplierIds,
  currentAgentGroupProfiles: getCurrentAgentGroupProfiles,
  currentAgentGroupSupplierProfiles: getCurrentAgentGroupSupplierProfiles
})
