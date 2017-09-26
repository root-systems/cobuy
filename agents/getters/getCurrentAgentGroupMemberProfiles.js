import { createSelector } from 'reselect'
import { filter, map, prop, values, contains } from 'ramda'

import getProfiles from 'dogstack-agents/profiles/getters/getProfiles'
import getCurrentAgentGroupMemberIds from './getCurrentAgentGroupMemberIds'

const getCurrentAgentGroupMemberProfiles = createSelector(
  getProfiles,
  getCurrentAgentGroupMemberIds,
  (profiles, memberIds) => {
    // console.log(memberIds)
    const memberProfiles = filter((profile) => {
      return contains(profile.agentId, memberIds)
    }, profiles)
    return values(memberProfiles)
  }
)

export default getCurrentAgentGroupMemberProfiles
