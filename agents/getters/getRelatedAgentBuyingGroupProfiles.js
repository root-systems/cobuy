import { createSelector } from 'reselect'
import { propEq, find, isNil, isEmpty, filter, pipe, prop, map, tap, values, contains } from 'ramda'

import getProfilesState from './getProfilesState'
import getRelatedAgentBuyingGroupIds from './getRelatedAgentBuyingGroupIds'

export default createSelector(
  getProfilesState,
  getRelatedAgentBuyingGroupIds,
  (profiles, buyingGroupIds) => {
    if (isNil(profiles)) return
    if (isEmpty(buyingGroupIds)) return
    const profilesArray = values(profiles)
    const filterProfilesByBuyingGroupId = profile => contains(profile.agentId, buyingGroupIds)
    return filter(filterProfilesByBuyingGroupId, profilesArray)
  }
)
