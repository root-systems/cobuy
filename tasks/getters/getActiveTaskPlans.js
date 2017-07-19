import { createSelector } from 'reselect'
import { filter, isNil, values } from 'ramda'

import getTaskPlans from './getTaskPlans'

const getActiveTaskPlans = createSelector(
  getTaskPlans,
  (taskPlans) => {
    const byDueDate = n => isNil(n.dueDate)
    return filter(byDueDate, values(taskPlans))
  }
)

export default getActiveTaskPlans
