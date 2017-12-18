import { createSelector } from 'reselect'
import { pipe, prop, map, sum } from 'ramda'

import getCurrentOrderId from './getCurrentOrderId'
import getDerivedOrderIntentsByOrderProductPrice from './getDerivedOrderIntentsByOrderProductPrice'

export default createSelector(
  getCurrentOrderId,
  getDerivedOrderIntentsByOrderProductPrice,
  (orderId, orderIntentsByOrderProductPrice) => {
    const orderIntentsByProductPrice = orderIntentsByOrderProductPrice[orderId] || {}
    return map(pipe(
      map(pipe(
        map(prop('desiredQuantity')),
        sum
      ))
    ), orderIntentsByProductPrice)
  }
)
