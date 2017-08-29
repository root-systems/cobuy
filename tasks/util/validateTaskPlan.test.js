import test from 'ava'
import * as mock from '../data/mock'
import ajv from '../../app/schemas'

const { validateSchema } = require('feathers-hooks-common')
const schema = require('../schemas/taskPlan')

let hookBefore

test.beforeEach(t => {
  hookBefore = {
    type: 'before',
    method: 'create',
    params: { provider: 'rest' },
    data: mock.mockTaskPlans[1]
  }
  console.log(hookBefore.data)
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
