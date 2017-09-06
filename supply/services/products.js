const feathersKnex = require('feathers-knex')
const { pipe, path, isNil } = require('ramda')
const { iff } = require('feathers-hooks-common')

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'products'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hasNoResourceType = pipe(
  path(['data', 'resourceTypeId']),
  isNil
)

const hooks = {
  before: {
    create: [
      iff(hasNoResourceType,
        createResourceType
      )
    ]
  },
  after: {},
  error: {}
}

function createResourceType (hook) {
  const resourceTypesService = hook.app.service('resourceTypes')
  return resourceTypesService.create({})
    .then(resourceType => {
      hook.data.resourceTypeId = resourceType.id
    })
    .then(() => hook)
}
