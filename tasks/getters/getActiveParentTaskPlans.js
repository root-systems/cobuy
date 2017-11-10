import { createSelector } from 'reselect'
import { prop, filter, pipe, isEmpty, isNil } from 'ramda'

import getActiveTaskPlans from './getActiveTaskPlans'

const getActiveParentTaskPlans = createSelector(
  getActiveTaskPlans,
  filter(pipe(
    prop('parentTaskPlanId'),
    isNil
  ))
)

export default getActiveParentTaskPlans
