import { createSelector } from 'reselect'
import { filter, isNil, values, not, prop, pipe } from 'ramda'

import getTaskPlans from './getTaskPlans'

const getParentTaskPlans = createSelector(
  getTaskPlans,
  pipe(
    values,
    filter(pipe(
      prop('parentTaskPlanId'),
      isNil
    ))
  )
)

export default getParentTaskPlans
