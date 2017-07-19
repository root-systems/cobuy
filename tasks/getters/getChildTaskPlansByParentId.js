import { createSelector } from 'reselect'
import { pipe, values, groupBy, prop } from 'ramda'

import getEnhancedTaskPlans from './getEnhancedTaskPlans'

const getChildTaskPlansByParentId = createSelector(
  getEnhancedTaskPlans,
  pipe(
    values,
    groupBy(prop('parentTaskPlanId'))
  )
)

export default getChildTaskPlansByParentId
