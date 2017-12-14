import { createSelector } from 'reselect'
import { values, pipe, map, flatten, groupBy, indexBy, prop } from 'ramda'

import getDerivedOrderIntents from './getDerivedOrderIntents'

export default createSelector(
  getDerivedOrderIntents,
  pipe(
    values,
    map(values),
    map(map(values)),
    map(map(map(values))),
    flatten
  )
)
