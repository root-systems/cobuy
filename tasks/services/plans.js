const feathersKnex = require('feathers-knex')
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { isEmpty, ifElse, is, assoc, prop, map, pipe, omit, __ } from 'ramda'
const { iff, validateSchema, disallow } = require('feathers-hooks-common')
const taskPlanSchema = require('../schemas/taskPlan')
import ajv from '../../app/schemas'
import * as taskRecipes from '../../tasks/data/recipes'

import queryByOrder from '../hooks/queryByOrder'
import { encode as encodeParams, decode as decodeParams } from '../../lib/paramsCodec'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'taskPlans'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

/*
all: authenticate('jwt'),
find: restrictToCurrentUserGroupsSuppliers,
get: restrictToCurrentUserGroupsSuppliers,
create: restrictToCurrentAgentOrGroupAdmin
update: restrictToAnyGroupAdmin,
patch: restrictToAnyGroupAdmin,
remove: restrictToAnyGroupAdmin
*/

const hooks = {
  before: {
    all: authenticate('jwt'),
    find: [
      queryByOrder
    ],
    create: [
      validateSchema(taskPlanSchema, ajv),
      encodeParams
    ],
    update: [
      validateSchema(taskPlanSchema, ajv),
      encodeParams
    ],
    patch: [
      validateSchema(taskPlanSchema, ajv),
      encodeParams
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
      var params = hook.params[childTaskRecipe.id]
      return taskPlans.create({
        parentTaskPlanId: hook.result.id,
        assigneeId: hook.data.assigneeId,
        taskRecipeId: childTaskRecipe.id,
        params: hook.result.params
      })
    })
  )
    .then(() => hook)
}
