const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { isEmpty, ifElse, is, assoc, prop, map, pipe, __ } from 'ramda'
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
  before: {
    all: [
      // encodeParams
    ]
  },
  after: {
    all: [
      decodeParams
    ],
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

const transformProp = transformer => propName => object => pipe(
  prop(propName),
  transformer,
  assoc(propName, __, object)
)(object)
const transformPropMaybeArray = (transformer) => (propName) => {
  const transform = transformProp(transformer)(propName)
  return ifElse(is(Array),
    map(transform),
    transform
  )
}

function encodeParams (hook) {
  if (hook.data) {
    hook.data = transformPropMaybeArray(JSON.stringify)('params')(hook.data)
  }
  return hook
}

function decodeParams (hook) {
  if (hook.result) {
    hook.result = transformPropMaybeArray(JSON.parse)('params')(hook.result)
  }
  return hook
}
