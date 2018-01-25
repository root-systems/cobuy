import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getProfiles from './getProfiles'
import getCurrentProfileId from './getCurrentProfileId'

export default createSelector(
  getCurrentProfileId,
  getProfiles,
  prop
)
