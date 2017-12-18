import {createSelector} from 'reselect'
import {pipe, map, prop, sortBy, reverse} from 'ramda'

import getPriceSpecsByProduct from './getPriceSpecsByProduct'

export default createSelector(
  getPriceSpecsByProduct,
  map(pipe(
    sortBy(prop('minimum')),
    reverse
  ))
)
