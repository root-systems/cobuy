import { createSelector } from 'reselect'
import { groupBy, prop, pipe, values } from 'ramda'

import getCurrentOrderOrderIntents from './getCurrentOrderOrderIntents'

export default createSelector(
  getCurrentOrderOrderIntents,
  pipe(
    values,
    groupBy(prop('agentId'))
  )
)
