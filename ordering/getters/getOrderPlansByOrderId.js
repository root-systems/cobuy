import { createSelector } from 'reselect'
import { values, pipe, map, filter, groupBy, prop } from 'ramda'

import getRawOrderPlans from './getRawOrderPlans'

export default createSelector(
  getRawOrderPlans,
  pipe(
    values,
    groupBy(prop('orderId'))
  )
)
