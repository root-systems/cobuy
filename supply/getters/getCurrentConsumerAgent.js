import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getCurrentConsumerAgentId from './getCurrentConsumerAgentId'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getCurrentConsumerAgentId,
  getAgents,
  prop
)
