const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { isEmpty } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'taskPlans'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {},
  after: {
    create: [
      iff(hasChildTasks, createChildTaskPlans)
    ]
  },
  error: {}
}

function hasChildTasks (hook) {
  const taskRecipe = taskRecipes[hook.data.taskRecipeId]
  return !isEmpty(taskRecipe.childTaskRecipes)
}

function createChildTaskPlans (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipe = taskRecipes[hook.data.taskRecipeId]
  const childTaskRecipes = taskRecipe.childTaskRecipes
  return Promise.all(
    childTaskRecipes.map((childTaskRecipe) => {
      return taskPlans.create({
        parentTaskPlanId: hook.result.id,
        assigneeId: hook.data.assigneeId,
        taskRecipeId: childTaskRecipe.id,
        params: hook.data.params
      })
    })
  )
  .then(() => hook)
}
