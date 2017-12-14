import {createSelector} from 'reselect'
import {pipe, map, prop, sortBy, reverse, tap} from 'ramda'

import getPriceSpecsByProduct from './getPriceSpecsByProduct'

export default createSelector(
  getPriceSpecsByProduct,
  map(pipe(
    sortBy(prop('minimum')),
    // tap(console.log),
    reverse
  ))
)
