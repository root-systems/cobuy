import { unnest } from 'ramda'
export default function createTaskPlan (api, options) {
  const { assignee, taskRecipe } = options
  const { childTaskRecipes = [] } = taskRecipe

  const taskPlansService = api.service('taskPlans')

  const parentTaskPlan = taskPlansService.create({
    assignee,
    taskRecipeId: taskRecipe.id
  })
  const childTaskPlans = childTaskRecipes.map(childTaskRecipe => {
    return createTaskPlan(api, {
      assignee,
      taskRecipe: childTaskRecipe
    })
  })

  return Promise.all([
    parentTaskPlan,
    ...childTaskPlans
  ]).then(unnest)
}
