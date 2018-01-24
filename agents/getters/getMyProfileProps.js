import { createStructuredSelector } from 'reselect'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'
import getCurrentAgentGroupProfiles from './getCurrentAgentGroupProfiles'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentAgentGroupIds: getCurrentAgentGroupIds,
  currentAgentGroupProfiles: getCurrentAgentGroupProfiles
})
