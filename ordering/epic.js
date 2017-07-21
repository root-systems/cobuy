import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'

import { getCurrentAgent } from 'dogstack-agents/getters'
import { agents } from 'dogstack-agents/actions'

import { startOrder } from './actions'
import { taskPlans } from '../actions'
import createTaskPlan from '../tasks/util/createTaskPlan'
import * as taskRecipes from '../tasks/data/recipes'

export default combineEpics(startOrderEpic)

export function startOrderEpic (action$, store, { feathers }) {
  return action$.ofType(startOrder.type)
    .switchMap(({ payload, meta: { cid }}) => {
      const currentAgent = getCurrentAgent(store.getState())
      const newGroupAgent = { type: 'group' }
      // TODO (mw) creating a group should create an admin
      // relationship with the person creating the group.
      // 
      // TODO (mw) new task plans should be assigned to the group admins.
      return Rx.Observable.concat(
        Rx.Observable.of(agents.create(cid, newGroupAgent)),
        createTaskPlan(action$, cid, {
          taskRecipe: taskRecipes.finishPrereqs,
          assignee: currentAgent.id
        })
      )
    })
}
