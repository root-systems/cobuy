import { createSelector } from 'reselect'
import { path } from 'ramda'

import getRelatedAgent from './getRelatedAgent'

export default createSelector(
  getRelatedAgent,
  path(['id'])
)
