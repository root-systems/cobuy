import { createSelector } from 'reselect'
import { indexBy, prop, filter, pipe, isNil, not, map, uncurryN } from 'ramda'

import getState from './getState'
import getRoutes from './getRoutes'

const indexByName = indexBy(prop('name'))
const filterNil = filter(pipe(isNil, not))

const getNavigationRoutes = createSelector(
  getState,
  getRoutes,
  uncurryN(2, state => {
    const mapRoutes = map(route => {
      const { name, navigation } = route
      if (isNil(navigation)) return
      if (navigation === true) return route
      const { selector } = navigation
      if (isNil(selector) || selector(state)) return route
    })
    return pipe(mapRoutes, filterNil, indexByName)
  })
)

export default getNavigationRoutes
