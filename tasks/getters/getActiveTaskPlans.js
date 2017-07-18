import { createSelector } from 'reselect'
import { filter, contains, map } from 'ramda'

import getTaskPlans from './getTaskPlans'
import getActiveTaskWorks from './getActiveTaskWorks'

const getActiveTaskPlans = createSelector(
  getActiveTaskWorks,
  getTaskPlans,
  (activeTaskWorks, taskPlans) => {
    return filter((taskPlan) => {
      return contains(taskPlan.id, map(activeTaskWorks, (taskWork) => taskWork.taskPlanId))
    }, taskPlans)
  }
)

export default getActiveTaskPlans
