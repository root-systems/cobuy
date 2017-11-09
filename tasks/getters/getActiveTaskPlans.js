import { createSelector } from 'reselect'
import { prop, filter, pipe, isEmpty } from 'ramda'

import getTaskPlans from './getTaskPlans'

const getActiveTaskPlans = createSelector(
  getTaskPlans,
  filter(pipe(prop('taskWork'), isEmpty))
)

export default getActiveTaskPlans
