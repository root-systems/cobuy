import { createSelector } from 'reselect'
import { map, pipe, flatten, values } from 'ramda'

import getCurrentOrderApplicableOrderIntentByOrderAgentProduct from './getCurrentOrderApplicableOrderIntentByOrderAgentProduct'

export default createSelector(
  getCurrentOrderApplicableOrderIntentByOrderAgentProduct,
  pipe(
    values,
    map(values),
    map(map(values)),
    flatten
  )
)
