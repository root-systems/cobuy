import { createSelector } from 'reselect'
import { pipe, prop, mapObjIndexed, sum } from 'ramda'

import getCurrentOrderCollectiveQuantityByProductPrice from './getCurrentOrderCollectiveQuantityByProductPrice'
import getCurrentOrderApplicablePriceSpecByProduct from './getCurrentOrderApplicablePriceSpecByProduct'

export default createSelector(
  getCurrentOrderCollectiveQuantityByProductPrice,
  getCurrentOrderApplicablePriceSpecByProduct,
  (quantityByProductPrice, applicablePriceSpecByProduct) => {
    return mapObjIndexed((quantityByPrice, productId) => {
      const applicablePriceSpec = applicablePriceSpecByProduct[productId]
      return quantityByPrice[applicablePriceSpec.id]
    }, quantityByProductPrice)
  }
)
