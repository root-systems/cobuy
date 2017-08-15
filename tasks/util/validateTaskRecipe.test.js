import test from 'ava'
import * as mock from '../data/mock'

const ajv = require('ajv')
const { validateSchema } = require('feathers-hooks-common')
const schema = require('../schemas/taskRecipe')

const hookBefore = {
  type: 'before',
  method: 'create',
  params: { provider: 'rest' },
  data: mock.mockTaskRecipes.finishPrereqs
}

test('works with simple recipe', (t) => {
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

test('fails with incorrect id', (t) => {
  let hookBeforeLocal = Object.assign({}, hookBefore, {
    data: {
      ...hookBefore.data,
      id: 'incorrectId'
    }
  })
  try {
    validateSchema(schema, ajv)(hookBeforeLocal)
    t.fail('validation passed unexpectedly')
  } catch (err) {
    t.deepEqual(err.errors, [
      "'id' should be equal to one of the allowed values"
    ])
  }
})

test('fails when child task recipes are invalid', (t) => {
  let hookBeforeLocal = Object.assign({}, hookBefore, {
    data: {
      ...hookBefore.data,
      childTaskRecipes: [{}]
    }
  })
  try {
    validateSchema(schema, ajv)(hookBeforeLocal)
    t.fail('validation passed unexpectedly')
  } catch (err) {
    t.deepEqual(err.errors, [
      "'childTaskRecipes[0]' should have required property 'id'"
    ])
  }
})
