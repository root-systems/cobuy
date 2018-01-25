import { createSelector } from 'reselect'
import { propEq, find, isNil } from 'ramda'

import getCurrentProfile from './getCurrentProfile'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getCurrentProfile,
  getAgents,
  (currentProfile, agents) => {
    if (isNil(currentProfile)) return
    return agents[currentProfile.agentId]
  }
)
