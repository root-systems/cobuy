import {createSelector} from 'reselect'
import {pipe, values, groupBy, prop} from 'ramda'

import getProducts from './getProducts'

export default createSelector(
  getProducts,
  pipe(values, groupBy(prop('supplierAgentId')))
)
