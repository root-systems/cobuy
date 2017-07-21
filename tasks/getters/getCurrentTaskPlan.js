import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getTaskPlans from './getTaskPlans'
import getCurrentTaskPlanId from './getCurrentTaskPlanId'

export default createSelector(
  getCurrentTaskPlanId,
  getTaskPlans,
  prop
)
