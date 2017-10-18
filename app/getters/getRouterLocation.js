import { prop } from 'ramda'
import {createSelector} from 'reselect'
import getRouter from './getRouter'

const getRouterLocation = createSelector(
  getRouter,
    prop('location')
)

export default getRouterLocation
