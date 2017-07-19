import test from 'ava'

import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'
import getRawTaskWorks from './getRawTaskWorks'

import { finishPrereqs } from '../data/recipes'

const agent = {
  id: 1,
  profile: {
    name: 'Sam'
  }
}

const taskPlan = {
  id: 1,
  agent,
  taskRecipeId: 'finishPrereqs'
}

const taskWork = {
  id: 1,
  taskPlanId: 1,
  taskRecipeId: 'finishPrereqs',
  agent
}

const mockTaskPlans = {
  1: taskPlan
}

const mockTaskRecipes = {
  finishPrereqs: finishPrereqs
}

const mockTaskWorks = {
  1: taskWork
}

const mockState = {
  taskPlans: mockTaskPlans,
  taskRecipes: mockTaskRecipes,
  taskWorks: mockTaskWorks
}

test('getRawTaskPlans', t => {
  t.deepEqual(getRawTaskPlans(mockState), mockTaskPlans)
})

test('getRawTaskRecipes', t => {
  t.deepEqual(getRawTaskRecipes(mockState), mockTaskRecipes)
})

test('getRawTaskWorks', t => {
  t.deepEqual(getRawTaskWorks(mockState), mockTaskWorks)
})
