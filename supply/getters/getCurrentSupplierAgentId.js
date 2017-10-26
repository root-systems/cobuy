import { createSelector } from 'reselect'
import { path } from 'ramda'

import getCurrentOrder from '../../ordering/getters/getCurrentOrder'

export default createSelector(
  getCurrentOrder,
  path(['supplierAgentId'])
)
