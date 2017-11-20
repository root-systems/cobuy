import { createSelector } from 'reselect'
import { groupBy, merge, pipe, reduce, map ,values } from 'ramda'
import { add } from 'bigmath'

import getCurrentOrderOrderPlansByProduct from './getCurrentOrderOrderPlansByProduct'

export default createSelector(
  getCurrentOrderOrderPlansByProduct,
  pipe(
    map(
      reduce((soFar, orderPlan) => {
        const { product, priceSpecId, quantity } = orderPlan

        if (soFar === null) {
          return {
            product,
            priceSpecId,
            quantity
          }
        }
        return merge(soFar, {
          quantity: add(quantity, soFar.quantity)
        })
      }, null)
    ),
  values
  )
)
