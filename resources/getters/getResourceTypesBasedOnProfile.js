import { createSelector } from 'reselect'
import { isEmpty, map, prop, contains, filter, values } from 'ramda'

import getResourceTypes from './getResourceTypes'
import getCurrentSupplierProductsBasedOnProfile from '../../supply/getters/getCurrentSupplierProductsBasedOnProfile'

export default createSelector(
  getResourceTypes,
  getCurrentSupplierProductsBasedOnProfile,
  (resourceTypes, products) => {
    if (isEmpty(resourceTypes)) return
    if (isEmpty(products)) return
    const getResourceTypeIds = map(prop('resourceTypeId'))
    const relevantResourceTypeIds = getResourceTypeIds(products)
    const filterResourceTypesByTheseProducts = resourceType => contains(resourceType.id, relevantResourceTypeIds)
    return filter(filterResourceTypesByTheseProducts, values(resourceTypes))
  }
)
