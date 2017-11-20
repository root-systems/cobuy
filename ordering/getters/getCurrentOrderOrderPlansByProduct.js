import { createSelector } from 'reselect'
import { groupBy, prop, pipe, values } from 'ramda'

import getCurrentOrderOrderPlans from './getCurrentOrderOrderPlans'

export default createSelector(
  getCurrentOrderOrderPlans,
  pipe(
    values,
    groupBy(prop('productId'))
  )
)
