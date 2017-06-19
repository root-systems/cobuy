import { createSelector, createStructuredSelector } from 'reselect'
import { pipe, not, isNil, map, filter, prop, propOr, indexBy, nthArg, uncurryN } from 'ramda'

export const getState = state => state

export const getHomeProps = (state) => ({})

export const getRoutes = pipe(
  nthArg(1),
  propOr(null, 'routes')
)

const indexByName = indexBy(prop('name'))
const filterNil = filter(pipe(isNil, not))
export const getNavigationRoutes = createSelector(
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

export const getLayoutProps = createStructuredSelector({
  routes: getRoutes,
  navigationRoutes: getNavigationRoutes
})
