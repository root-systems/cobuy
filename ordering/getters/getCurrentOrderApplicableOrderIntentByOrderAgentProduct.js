import { createSelector } from 'reselect'
import { map, mapObjIndexed } from 'ramda'

import getCurrentOrderApplicablePriceSpecByProduct from './getCurrentOrderApplicablePriceSpecByProduct'
import getDerivedOrderIntents from './getDerivedOrderIntents'

export default createSelector(
  getCurrentOrderApplicablePriceSpecByProduct,
  getDerivedOrderIntents,
  (priceSpecByProduct, orderIntents) => {
    return map(map(
      mapObjIndexed((orderIntentsByPrice, productId) => {
        const applicablePriceSpec = priceSpecByProduct[productId]
        return orderIntentsByPrice[applicablePriceSpec.id]
      })
    ))(orderIntents)
  }
)
