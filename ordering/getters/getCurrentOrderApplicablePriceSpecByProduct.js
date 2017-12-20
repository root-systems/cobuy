import { createSelector } from 'reselect'
import { mapObjIndexed, find, isNil } from 'ramda'

import getCurrentOrderCollectiveQuantityByProductPrice from './getCurrentOrderCollectiveQuantityByProductPrice'
import getSortedByMinPriceSpecsByProduct from '../../supply/getters/getSortedByMinPriceSpecsByProduct'

export default createSelector(
  getSortedByMinPriceSpecsByProduct,
  getCurrentOrderCollectiveQuantityByProductPrice,
  (priceSpecsByProduct, collectiveQuantityByProductPrice) => {
    return mapObjIndexed((priceSpecs, productId) => {
      const quantityByPrice = collectiveQuantityByProductPrice[productId]
      // if no quantityByPrice, return the priceSpec with the smallest minimum for that product
      if (isNil(quantityByPrice)) {
        return priceSpecs[priceSpecs.length - 1]
      }

      const applicablePriceSpec = find((priceSpec) => {
        const { id, minimum } = priceSpec
        return quantityByPrice[id] >= minimum
      }, priceSpecs)

      // if there are intents, but no minimum has been reached yet, return the priceSpec with the smallest minimum for that product
      if (isNil(applicablePriceSpec)) {
        return priceSpecs[priceSpecs.length - 1]
      }

      return applicablePriceSpec
    }, priceSpecsByProduct)
  }
)
