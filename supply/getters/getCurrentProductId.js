import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getRouterParams from '../../app/getters/getRouterParams'

export default createSelector(
  getRouterParams,
  prop('productId')
)
