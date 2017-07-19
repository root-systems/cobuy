import test from 'ava'

import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'
import getRawTaskWorks from './getRawTaskWorks'
import getEnhancedTaskPlans from './getEnhancedTaskPlans'
import getChildTaskPlansByParentId from './getChildTaskPlansByParentId'

import { finishPrereqs } from '../data/recipes'

import { groupBy, values, prop } from 'ramda'

const agent = {
  id: 1,
  profile: {
    name: 'Sam'
  }
}

const taskPlan = {
  id: 1,
  parentTaskPlanId: 2,
  assignee: 1,
  taskRecipeId: 'finishPrereqs'
}

const taskWork = {
  id: 1,
  taskPlanId: 1,
  taskRecipeId: 'finishPrereqs',
  agent
}

const mockAgents = {
  1: agent
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
  taskWorks: mockTaskWorks,
  agents: mockAgents
}

const mockEnhancedTaskPlans = {
  1: {
    id: 1,
    parentTaskPlanId: 2,
    assignee: agent,
    taskRecipeId: 'finishPrereqs',
    taskRecipe: {
      id: 'finishPrereqs',
      childTaskRecipes: finishPrereqs.childTaskRecipes
    }
  }
}

const mockEnhancedTaskPlansByParentId = {
  2: [ {
    id: 1,
    parentTaskPlanId: 2,
    assignee: agent,
    taskRecipeId: 'finishPrereqs',
    taskRecipe: finishPrereqs
  } ]
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

test('getEnhancedTaskPlans', t => {
  t.deepEqual(getEnhancedTaskPlans(mockState), mockEnhancedTaskPlans)
})

test('getChildTaskPlansByParentId', t => {
  t.deepEqual(getChildTaskPlansByParentId(mockState), mockEnhancedTaskPlansByParentId)
})
