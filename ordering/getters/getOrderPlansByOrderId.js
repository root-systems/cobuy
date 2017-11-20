import { createSelector } from 'reselect'
import { values, pipe, map, filter, groupBy, prop } from 'ramda'

import getOrderPlans from './getOrderPlans'

export default createSelector(
  getOrderPlans,
  pipe(
    values,
    groupBy(prop('orderId'))
  )
)
