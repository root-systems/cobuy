import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getCurrentAgentAllProfiles from './getCurrentAgentAllProfiles'
import getCurrentProfileId from './getCurrentProfileId'

export default createSelector(
  getCurrentProfileId,
  getCurrentAgentAllProfiles,
  prop
)
