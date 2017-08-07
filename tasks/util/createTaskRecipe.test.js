import test from 'ava'

import * as taskRecipes from '../data/recipes'

const ajv = require('ajv')
const { validateSchema } = require('feathers-hooks-common')
const schema = require('../schemas/taskRecipe')

test('create simple recipe', (t) => {
  const hookBefore = {
    type: 'before',
    method: 'create',
    params: { provider: 'rest' },
    data: taskRecipes.setupSupplier
  }
  try {
    validateSchema(schema, ajv)(hookBefore)
  } catch (err) {
    if (err.errors) {
      console.log('validation errors: ', err.errors)
    }
    t.fail('creation failed unexpectedly')
  }
  t.pass('recipe was created')
})
