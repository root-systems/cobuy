import test from 'ava'

import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'
import getRawTaskWorks from './getRawTaskWorks'
import getEnhancedTaskPlans from './getEnhancedTaskPlans'
import getChildTaskPlansByParentId from './getChildTaskPlansByParentId'
import getTaskPlans from './getTaskPlans'
import getActiveTaskPlans from './getActiveTaskPlans'
import getParentTaskPlans from './getParentTaskPlans'

import {
  mockTaskPlans,
  mockTaskRecipes,
  mockTaskWorks,
  mockState,
  mockEnhancedTaskPlans,
  mockEnhancedTaskPlansByParentId,
  mockFullTaskPlans,
  mockFullTaskPlansArray,
  mockFullParentTaskPlan
} from '../data/mock'

test('getRawTaskPlans', t => {
  t.deepEqual(getRawTaskPlans(mockState), mockTaskPlans)
})

test('getRawTaskRecipes', t => {
  t.deepEqual(getRawTaskRecipes(mockState), mockTaskRecipes)
})

test('getRawTaskWorks', t => {
  t.deepEqual(getRawTaskWorks(mockState), mockTaskWorks)
})

test('getEnhancedTaskPlans', t => {
  t.deepEqual(getEnhancedTaskPlans(mockState), mockEnhancedTaskPlans)
})
//
test('getChildTaskPlansByParentId', t => {
  t.deepEqual(getChildTaskPlansByParentId(mockState), mockEnhancedTaskPlansByParentId)
})
//
test('getTaskPlans', t => {
  t.deepEqual(getTaskPlans(mockState), mockFullTaskPlans)
})

test.skip('getTaskPlans might fail in the event of non-uniform child depth', t => {
  // we have a condition to protect against this but the getTaskPlans test does not test this
  t.fail()
})

test('getActiveTaskPlans', t => {
  t.deepEqual(getActiveTaskPlans(mockState), mockFullTaskPlansArray)
})

test('getParentTaskPlans', t => {
  t.deepEqual(getParentTaskPlans(mockState), [ mockFullParentTaskPlan ])
})
