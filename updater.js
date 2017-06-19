import { concat, updateStateAt } from 'redux-fp'
import { routerReducer } from 'react-router-redux'

import { updater as agents } from 'dogstack-agents'

const router = updateStateAt('router', reducerToUpdater(routerReducer))

export default concat(
  agents,
  router
)

function reducerToUpdater (reducer) {
  return action => state => reducer(state, action)
}
