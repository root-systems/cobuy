import test from 'ava'

import createTaskPlan from './createTaskPlan'
import * as taskRecipes from '../data/recipes'

test('create simple task', (t) => {
  t.plan(3)

  const assignee = Symbol('assignee')
  const taskRecipe = taskRecipes.setupGroup
  const expected = { assignee, taskRecipeId: taskRecipe.id }

  const api = {
    service: () => {
      return {
        create: (data, params) => {
          t.deepEqual(data, expected)
          return data
        }
      }
    }
  }
  const options = { assignee, taskRecipe }
  return createTaskPlan(api, options)
    .then(taskPlans => {
      t.is(taskPlans.length, 1)
      t.deepEqual(taskPlans[0], expected)
    })
})

test('create nested task', (t) => {
  t.plan(5)

  const assignee = Symbol('assignee')
  const taskRecipe = taskRecipes.finishPrereqs
  const expecteds = [
    { assignee, taskRecipeId: taskRecipe.id },
    { assignee, taskRecipeId: taskRecipe.childTaskRecipes[0].id },
    { assignee, taskRecipeId: taskRecipe.childTaskRecipes[1].id }
  ]
  var i = 0

  const api = {
    service: () => {
      return {
        create: (data, params) => {
          t.deepEqual(data, expecteds[i++])
          return data
        }
      }
    }
  }
  const options = { assignee, taskRecipe }
  return createTaskPlan(api, options)
    .then(taskPlans => {
      t.is(taskPlans.length, 3)
      t.deepEqual(taskPlans, expecteds)
    })
})
