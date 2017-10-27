import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getProducts from './getProducts'
import getCurrentProductId from './getCurrentProductId'

export default createSelector(
  getCurrentProductId,
  getProducts,
  prop
)
