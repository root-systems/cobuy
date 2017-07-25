import { unnest } from 'ramda'

export default function createTaskPlan (options) {
  const { assignee, taskRecipe } = options
  const { childTaskRecipes = [] } = taskRecipe

  const parentTaskPlan = {
    assignee,
    taskRecipeId: taskRecipe.id
  }

  const childTaskPlans = childTaskRecipes.map(childTaskRecipe => {
    return createTaskPlan({
      assignee,
      taskRecipe: childTaskRecipe
    })
  })

  return unnest([
    parentTaskPlan,
    ...childTaskPlans
  ])
}
