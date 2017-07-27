import { concat, updateStateAt } from 'redux-fp'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { updater as agents } from 'dogstack-agents'
import { updater as taskPlans } from './tasks/dux/plans'
import { updater as taskWorks } from './tasks/dux/works'
import { updater as orders } from './ordering/dux/orders'
import { updater as agentRelationships } from './agents/dux/relationships'
import taskRecipes from './tasks/updaters/recipes'

const router = updateStateAt('router', reducerToUpdater(routerReducer))
const form = updateStateAt('form', reducerToUpdater(formReducer))

export default concat(
  agents,
  agentRelationships,
  orders,
  taskPlans,
  taskWorks,
  taskRecipes,
  router,
  form
)

function reducerToUpdater (reducer) {
  return action => state => reducer(state, action)
}
