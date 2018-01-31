import { createSelector } from 'reselect'
import { propOr } from 'ramda'

import getProductsBySupplier from './getProductsBySupplier'
import getRelatedAgentId from '../../agents/getters/getRelatedAgentId'

export default createSelector(
  getRelatedAgentId,
  getProductsBySupplier,
  propOr([])
)
