import { createSelector } from 'reselect'
import { pipe, values, groupBy, prop } from 'ramda'

import getTokenConsumesState from './getTokenConsumesState'

export default createSelector(
  getTokenConsumesState,
  pipe(
    values,
    groupBy(prop('tokenId'))
  )
)
