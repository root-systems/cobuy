import { prop, pipe } from 'ramda'
import {createSelector} from 'reselect'
import getRouterLocation from './getRouterLocation'
import { parse } from 'query-string'

const getRouterParams = createSelector(
  getRouterLocation,
  /*
  (router) => {
    const { search } = router
    const params = parse(search)
    return params
  }
  */
  pipe(
    prop('search'),
    parse
  )
)

export default getRouterParams
