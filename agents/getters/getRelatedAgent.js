import { createSelector } from 'reselect'
import { propEq, find, isNil } from 'ramda'

import getCurrentProfile from './getCurrentProfile'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getCurrentProfile,
  getAgents,
  (currentProfile, agents) => {
    if (isNil(currentProfile)) return
    console.log('getter currentProfile', currentProfile)
    console.log('getter agents', agents)
    console.log('getter result', agents[currentProfile.agentId])
    return agents[currentProfile.agentId]
  }
)
