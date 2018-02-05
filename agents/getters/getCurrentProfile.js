import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getProfilesState from './getProfilesState'
import getCurrentProfileId from './getCurrentProfileId'

export default createSelector(
  getCurrentProfileId,
  getProfilesState,
  prop
)
