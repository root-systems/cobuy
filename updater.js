import { concat, updateStateAt } from 'redux-fp'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { updater as agents } from 'dogstack-agents'

const router = updateStateAt('router', reducerToUpdater(routerReducer))
const form = updateStateAt('form', reducerToUpdater(formReducer))

export default concat(
  agents,
  router,
  form
)

function reducerToUpdater (reducer) {
  return action => state => reducer(state, action)
}
