import { createSelector } from 'reselect'
import { pipe, values, groupBy, prop } from 'ramda'

import getTaskWorks from './getRawTaskWorks'

export default createSelector(
  getTaskWorks,
  pipe(
    values,
    groupBy(prop('taskPlanId'))
  )
)
