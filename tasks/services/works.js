const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { map, prop } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'taskWorks'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {},
  after: {
    create: [
      iff(completeOrderSetupTaskWork, createCastOrderIntentTaskPlan)
    ]
  },
  error: {}
}

function completeOrderSetupTaskWork (hook) {
  return hook.data.taskRecipeId === 'completeOrderSetupWithPrereqs'
  || hook.data.taskRecipeId === 'completeOrderSetup'
}

function createCastOrderIntentTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const relationships = hook.app.service('relationships')
  const taskRecipeId = taskRecipes.castIntent.id
  const completeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(completeOrderTaskPlanId)
  .then((completeOrderTaskPlan) => {
    const groupId = completeOrderTaskPlan.params.consumerAgentId
    const orderId = completeOrderTaskPlan.params.orderId
    const supplierAgentId = completeOrderTaskPlan.params.supplierAgentId
    const params = { orderId, consumerAgentId: groupId, supplierAgentId }

    return relationships.find({
      query: {
        sourceId: groupId,
        relationshipType: 'member'
      }
    })
    .then((relationships) => {
      return Promise.all(
        map((relationship) => {
          const assigneeId = prop('targetId', relationship)
          return taskPlans.create({ taskRecipeId, params, assigneeId })
        }, relationships)
      )
    })
  })
  .then(() => hook)
}
