import { createSelector } from 'reselect'
import { pipe, prop, map } from 'ramda'

import getOrderIntentsByOrderProductPriceAgent from './getOrderIntentsByOrderProductPriceAgent'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getOrderIntentsByOrderProductPriceAgent,
  (orderId, orderIntentsByOrderProductPriceAgent) => {
    return orderIntentsByOrderProductPriceAgent[orderId] || {}
  }
  /*
  pipe(
    prop,
    map
  )
  */
)
