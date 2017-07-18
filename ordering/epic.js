import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'
import Cid from 'incremental-id'

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
      const prereqOrderTaskPlans = createTaskPlan({
        taskRecipe: taskRecipes.finishPrereqs,
        assignee: currentAgent.id
      })
      console.log('prereqOrderTaskPlans', prereqOrderTaskPlans)
      // TODO (mw) creating a group should create an admin
      // relationship with the person creating the group.
      // 
      // TODO (mw) new task plans should be assigned to the group admins.
      return Rx.Observable.of(
        agents.create(cid, newGroupAgent),
        ...prereqOrderTaskPlans.map(taskPlan => {
          // (mw) need a sub-cid otherwise maybe epic will mess up?
          // TODO hm. ho ho ho hum........... hmmm.
          const subCid = `${cid}/${Cid()}`
          return taskPlans.create(subCid, taskPlan)
        })
      )
    })
}
