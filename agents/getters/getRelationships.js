import { createSelector } from 'reselect'
import { map, filter, values, concat, isNil, isEmpty, groupBy, prop, pipe } from 'ramda'

import getRelationshipsState from './getRelationshipsState'

export default createSelector(
  getRelationshipsState,
  (relationshipsState) => {
    return values(relationshipsState)
  }
)
