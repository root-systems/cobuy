import { createSelector } from 'reselect'
import { uncurryN, filter, isNil } from 'ramda'

import getState from './getState'
import getAllRoutes from './getAllRoutes'

const getRoutes = createSelector(
  getState,
  getAllRoutes,
  uncurryN(2, state => filter(route => {
    const { selector } = route
    return isNil(selector) || selector(state)
  }))
)

export default getRoutes
