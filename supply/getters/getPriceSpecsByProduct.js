import {createSelector} from 'reselect'
import {pipe, values, groupBy, prop} from 'ramda'

import getPriceSpecs from './getPriceSpecs'

export default createSelector(
  getPriceSpecs,
  pipe(values, groupBy(prop('productId')))
)
