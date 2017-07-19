import test from 'ava'

import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'
import getRawTaskWorks from './getRawTaskWorks'
import getEnhancedTaskPlans from './getEnhancedTaskPlans'
import getChildTaskPlansByParentId from './getChildTaskPlansByParentId'
import getTaskPlans from './getTaskPlans'

import { finishPrereqs, setupGroup, setupSupplier } from '../data/recipes'

const agent = {
  id: 1,
  profile: {
    name: 'Sam'
  }
}

const finishPrereqsTaskPlan = {
  id: 1,
  parentTaskPlanId: null,
  assignee: 1,
  taskRecipeId: 'finishPrereqs'
}

const setupGroupTaskPlan = {
  id: 2,
  parentTaskPlanId: 1,
  assignee: 1,
  taskRecipeId: 'setupGroup'
}

const setupSupplierTaskPlan = {
  id: 3,
  parentTaskPlanId: 1,
  assignee: 1,
  taskRecipeId: 'setupSupplier'
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
  1: finishPrereqsTaskPlan,
  2: setupGroupTaskPlan,
  3: setupSupplierTaskPlan
}

const mockTaskRecipes = {
  finishPrereqs,
  setupGroup,
  setupSupplier
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
     parentTaskPlanId: null,
     assignee: agent,
     taskRecipeId: 'finishPrereqs',
     taskRecipe: finishPrereqs
   },
  2: {
     id: 2,
     parentTaskPlanId: 1,
     assignee: agent,
     taskRecipeId: 'setupGroup',
     taskRecipe: setupGroup
   },
  3: {
     id: 3,
     parentTaskPlanId: 1,
     assignee: agent,
     taskRecipeId: 'setupSupplier',
     taskRecipe: setupSupplier
   }
 }

const mockEnhancedTaskPlansByParentId = { 1:
   [ { id: 2,
       parentTaskPlanId: 1,
       assignee: agent,
       taskRecipeId: 'setupGroup',
       taskRecipe: setupGroup },
     { id: 3,
       parentTaskPlanId: 1,
       assignee: agent,
       taskRecipeId: 'setupSupplier',
       taskRecipe: setupSupplier } ],
  null:
   [ { id: 1,
       parentTaskPlanId: null,
       assignee: agent,
       taskRecipeId: 'finishPrereqs',
       taskRecipe: finishPrereqs } ] }

var mockFullTaskPlanId1 = {
  id: 1,
  parentTaskPlanId: null,
  assignee: agent,
  taskRecipeId: 'finishPrereqs',
  taskRecipe:
  { id: 'finishPrereqs',
    childTaskRecipes: [ setupGroup, setupSupplier ] }
}

const mockFullTaskPlanId2 = {
  id: 2,
  parentTaskPlanId: 1,
  assignee: agent,
  taskRecipeId: 'setupGroup',
  taskRecipe: setupGroup,
  childTaskPlans: [],
  parentTaskPlan: mockFullTaskPlanId1
}

const mockFullTaskPlanId3 = {
  id: 3,
  parentTaskPlanId: 1,
  assignee: agent,
  taskRecipeId: 'setupSupplier',
  taskRecipe: setupSupplier,
  childTaskPlans: [],
  parentTaskPlan: mockFullTaskPlanId1
}

mockFullTaskPlanId1.childTaskPlans = [ mockFullTaskPlanId2, mockFullTaskPlanId3 ]

var mockFullTaskPlans = {
  1: mockFullTaskPlanId1,
  2: mockFullTaskPlanId2,
  3: mockFullTaskPlanId3
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
