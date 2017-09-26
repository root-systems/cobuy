const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')

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

// TODO: IK:
/*
- check if the taskWork's taskRecipeId was completeOrderSetupWithPrereqs or completeOrderSetup
- if so, then create a castOrderIntentTaskPlan for every member of the group selected for the created order
  - we determine what the group was by looking at hook.data.taskPlanId which references the taskPlan, then grab the consumerAgentId of that taskPlan which references the group for the order

- check admin of order is being assigned properly?
*/

function completeOrderSetupTaskWork (hook) {
  console.log(hook.data)
  return hook.data.taskRecipeId === 'completeOrderSetupWithPrereqs'
  || hook.data.taskRecipeId === 'completeOrderSetup'
}

function createCastOrderIntentTaskPlan (hook) {

  return hook
}
