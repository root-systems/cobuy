import { createSelector } from 'reselect'
import { map, merge } from 'ramda'

import getProductsState from './getProductsState'
import getResourceTypes from '../../resources/getters/getResourceTypes'

export default createSelector(
  getProductsState,
  getResourceTypes,
  (products, resourceTypes) => {
    const mapProducts = map(product => {
      const resourceType = resourceTypes[product.resourceTypeId]
      return merge(product, {
        resourceType
      })
    })
    return mapProducts(products)
  }
)
