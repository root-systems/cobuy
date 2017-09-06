import { createSelector } from 'reselect'

import getResourceTypesState from './getResourceTypesState'

export default createSelector(
  getResourceTypesState,
  (resourceTypes) => resourceTypes
)
