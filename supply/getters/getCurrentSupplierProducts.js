import { createSelector } from 'reselect'
import { propOr } from 'ramda'

import getProductsBySupplier from './getProductsBySupplier'
import getCurrentSupplierAgentId from './getCurrentSupplierAgentId'

export default createSelector(
  getCurrentSupplierAgentId,
  getProductsBySupplier,
  propOr([])
)
