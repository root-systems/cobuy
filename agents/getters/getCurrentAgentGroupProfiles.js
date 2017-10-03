import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getProfiles from 'dogstack-agents/profiles/getters/getProfiles'
import getCurrentAgentGroupIds from './getCurrentAgentGroupIds'

const getCurrentAgentGroupProfiles = createSelector(
  getProfiles,
  getCurrentAgentGroupIds,
  (profiles, groupIds) => {
    const groupProfiles = filter((profile) => {
      return contains(profile.agentId, groupIds)
    }, profiles)
    return values(groupProfiles)
  }
)

export default getCurrentAgentGroupProfiles
