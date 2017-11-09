import { createSelector } from 'reselect'
import { values, pipe, map, filter, indexBy, prop } from 'ramda'

import getOrderPlans from './getOrderPlans'

export default createSelector(
  getOrderPlans,
  filter(prop('orderId'))
)
