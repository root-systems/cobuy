import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getOrders from './getOrders'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getOrders,
  prop
)
