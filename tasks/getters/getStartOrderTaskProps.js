import { createStructuredSelector } from 'reselect'
import getOrders from '../../ordering/getters/getOrders'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentAgentGroupIds from '../../agents/getters/getCurrentAgentGroupIds'
import getCurrentAgentGroupProfiles from '../../agents/getters/getCurrentAgentGroupProfiles'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  orders: getOrders,
  currentAgentGroupIds: getCurrentAgentGroupIds,
  currentAgentGroupProfiles: getCurrentAgentGroupProfiles
})
