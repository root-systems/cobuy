import { createSelector } from 'reselect'
import { values, pipe, map, groupBy, indexBy, prop } from 'ramda'

import getOrderIntents from './getOrderIntents'

export default createSelector(
  getOrderIntents,
  pipe(
    values,
    groupBy(prop('orderId')),
    map(pipe(
      groupBy(prop('agentId')),
      map(pipe(
        groupBy(prop('productId')),
        map(indexBy(prop('priceSpecId')))
      ))
    ))
  )
)
