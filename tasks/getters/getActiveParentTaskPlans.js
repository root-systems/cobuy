import { createSelector } from 'reselect'
import { prop, filter, pipe, isEmpty, isNil } from 'ramda'

import getTaskPlans from './getTaskPlans'

const getActiveParentTaskPlans = createSelector(
  getTaskPlans,
  pipe(
    filter(pipe(prop('taskWork'), isEmpty)),
    filter(pipe(
      prop('parentTaskPlanId'),
      isNil
    ))
  )
)

export default getActiveParentTaskPlans
