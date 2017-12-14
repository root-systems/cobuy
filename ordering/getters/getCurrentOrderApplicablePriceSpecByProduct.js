import { createSelector } from 'reselect'
import { pipe, prop, mapObjIndexed, find } from 'ramda'

import getCurrentOrderCollectiveQuantityByProductPrice from './getCurrentOrderCollectiveQuantityByProductPrice'
import getSortedByMinPriceSpecsByProduct from '../../supply/getters/getSortedByMinPriceSpecsByProduct'

export default createSelector(
  getSortedByMinPriceSpecsByProduct,
  getCurrentOrderCollectiveQuantityByProductPrice,
  (priceSpecsByProduct, collectiveQuantityByProductPrice) => {
    return mapObjIndexed((quantityByPrice, productId) => {
      const priceSpecs = priceSpecsByProduct[productId]
      return find((priceSpec) => {
        const { id, minimum } = priceSpec
        return quantityByPrice[id] >= minimum
      }, priceSpecs)
    }, collectiveQuantityByProductPrice)
  }
)
