import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getCurrentOrderId from './getCurrentOrderId'

const getOrderPlans = (state) => state.orderPlans

export default createSelector(
  getCurrentOrderId,
  getOrderPlans,
  prop
)
