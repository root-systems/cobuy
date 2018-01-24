import test from 'ava'

import createTaskPlan from './createTaskPlan'
import * as taskRecipes from '../data/recipes'

/*
TODO fix tests
*/
test.skip('create simple task', (t) => {
  const assignee = Symbol('assignee')
  const taskRecipe = taskRecipes.setupGroup
  const expected = [
    { assignee, taskRecipeId: taskRecipe.id }
  ]

  const options = { assignee, taskRecipe }
  const taskPlans = createTaskPlan(options)
  t.deepEqual(taskPlans, expected)
})

test.skip('create nested task', (t) => {
  const assignee = Symbol('assignee')
  const taskRecipe = taskRecipes.finishPrereqs
  const expected = [
    { assignee, taskRecipeId: taskRecipe.id },
    { assignee, taskRecipeId: taskRecipe.childTaskRecipes[0].id },
    { assignee, taskRecipeId: taskRecipe.childTaskRecipes[1].id }
  ]
  const options = { assignee, taskRecipe }
  const taskPlans = createTaskPlan(options)
  t.deepEqual(taskPlans, expected)
})
