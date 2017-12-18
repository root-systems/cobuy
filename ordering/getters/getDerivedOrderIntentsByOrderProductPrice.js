import { createSelector } from 'reselect'
import { values, pipe, map, flatten, groupBy, indexBy, prop } from 'ramda'

import getDerivedOrderIntentsUngrouped from './getDerivedOrderIntentsUngrouped'

export default createSelector(
  getDerivedOrderIntentsUngrouped,
  pipe(
    groupBy(prop('orderId')),
    map(pipe(
      groupBy(prop('productId')),
      map(groupBy(prop('priceSpecId')))
    ))
  )
)
