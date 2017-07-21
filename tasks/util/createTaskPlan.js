import Rx from 'rxjs'
import Cid from 'incremental-id'

import { actions as taskPlans } from '../dux/plans'

export default function createTaskPlan (action$, cid, options) {
  const { assignee, taskRecipe, parentTaskPlanId } = options
  const { childTaskRecipes = [] } = taskRecipe

  const parentTaskPlan = {
    assignee,
    taskRecipeId: taskRecipe.id,
    parentTaskPlanId
  }

  console.log('taskPlan', parentTaskPlan)

  var nextActions$ = Rx.Observable.of(taskPlans.create(cid, parentTaskPlan))

  if (childTaskRecipes.length > 0) {
    const parentTaskPlanSet$ = action$.ofType(taskPlans.set.type).filter(onlyCid).take(1)

    nextActions$ = nextActions$.concat(
      parentTaskPlanSet$.mergeMap(action => {
        return createChildTaskPlans(action.payload.data.id)
      })
    )
  }

  return nextActions$

  function createChildTaskPlans (parentTaskPlanId) {
    // (mw) need a sub-cid otherwise maybe epic will mess up?
    return Rx.Observable.merge(
      ...childTaskRecipes.map(childTaskRecipe => {
        const subCid = `${cid}/${Cid()}`
        return createTaskPlan(action$, subCid, {
          assignee,
          taskRecipe: childTaskRecipe,
          parentTaskPlanId
        })
      })
    )
  }

  function onlyCid (action) {
    return action.meta.cid === cid
  }
}
