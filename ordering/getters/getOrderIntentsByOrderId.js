import { createSelector } from 'reselect'
import { values, pipe, groupBy, prop } from 'ramda'

import getOrderIntents from './getOrderIntents'

export default createSelector(
  getOrderIntents,
  pipe(
    values,
    groupBy(prop('orderId'))
  )
)
