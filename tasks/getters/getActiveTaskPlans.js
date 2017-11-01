import { createSelector } from 'reselect'
import { map, prop, filter, contains, not, values } from 'ramda'

import getParentTaskPlans from './getParentTaskPlans'
import getRawTaskWorks from './getRawTaskWorks'

const getActiveTaskPlans = createSelector(
  getParentTaskPlans,
  getRawTaskWorks,
  (taskPlans, taskWorks) => {
    const taskWorksTaskPlanIds = map(prop('taskPlanId'), values(taskWorks))
    return filter((taskPlan) => {
      return not(contains(taskPlan.id, taskWorksTaskPlanIds))
    }, taskPlans)
  }
)

export default getActiveTaskPlans
