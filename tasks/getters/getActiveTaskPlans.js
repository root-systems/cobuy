import { createSelector } from 'reselect'
import { prop, filter, pipe, not } from 'ramda'

import getTaskPlans from './getTaskPlans'

const getActiveTaskPlans = createSelector(
  getTaskPlans,
  filter(pipe(prop('hasWork'), not))
)

export default getActiveTaskPlans
