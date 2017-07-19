import { createSelector } from 'reselect'
import { pipe, values, groupBy, prop } from 'ramda'

import getEnhancedTaskPlans from './getEnhancedTaskPlans'

// const getChildTaskPlansByParentId = createSelector(
//   getEnhancedTaskPlans,
//   pipe(
//     values,
//     groupBy(prop('parentTaskPlanId'))
//   )
// )

const getChildTaskPlansByParentId = createSelector(
  getEnhancedTaskPlans,
  (enhancedTaskPlans) => {
    const byParentTaskPlanId = groupBy(prop('parentTaskPlanId'))
    return byParentTaskPlanId(values(enhancedTaskPlans))
  }
)

export default getChildTaskPlansByParentId
