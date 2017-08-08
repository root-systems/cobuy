import test from 'ava'
import jsf from 'json-schema-faker'

const Ajv = require('ajv')
const { validateSchema } = require('feathers-hooks-common')
const schema = require('../schemas/taskPlan')
const taskRecipeSchema = require('../schemas/taskRecipe')

let ajv = new Ajv({ $data: true })
ajv.addSchema([taskRecipeSchema, schema])

let hookBefore

test.beforeEach(t => {
  return jsf.resolve(schema).then((result) => {
    hookBefore = {
      type: 'before',
      method: 'create',
      params: { provider: 'rest' },
      data: result
    }
    console.log(hookBefore.data)
  })
})

test('works with simple plan', (t) => {
  try {
    validateSchema(schema, ajv)(hookBefore)
  } catch (err) {
    if (err.errors) {
      console.log('validation errors: ', err.errors)
    }
    t.fail('validation failed unexpectedly')
  }
  t.pass('recipe was validated')
})
