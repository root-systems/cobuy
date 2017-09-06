import { createSelector } from 'reselect'
import { map, merge } from 'ramda'

import getProductsState from './getProductsState'
import getResourceTypes from '../../resources/getters/getResourceTypes'
import getPriceSpecsByProduct from './getPriceSpecsByProduct'

export default createSelector(
  getProductsState,
  getResourceTypes,
  getPriceSpecsByProduct,
  (products, resourceTypes, priceSpecsByProduct) => {
    const mapProducts = map(product => {
      const resourceType = resourceTypes[product.resourceTypeId]
      const priceSpecs = priceSpecsByProduct[product.id]
      return merge(product, {
        resourceType,
        priceSpecs
      })
    })
    return mapProducts(products)
  }
)
