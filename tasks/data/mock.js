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

export const mockTaskPlans = {
  1: finishPrereqsTaskPlan,
  2: setupGroupTaskPlan,
  3: setupSupplierTaskPlan
}

export const mockTaskRecipes = {
  finishPrereqs,
  setupGroup,
  setupSupplier
}

export const mockTaskWorks = {
  1: taskWork
}

export const mockState = {
  taskPlans: mockTaskPlans,
  taskRecipes: mockTaskRecipes,
  taskWorks: mockTaskWorks,
  agents: mockAgents
}

export const mockEnhancedTaskPlans = {
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

export const mockEnhancedTaskPlansByParentId = { 1:
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

export var mockFullTaskPlans = {
  1: mockFullTaskPlanId1,
  2: mockFullTaskPlanId2,
  3: mockFullTaskPlanId3
}

export const mockFullTaskPlansArray = [
  mockFullTaskPlanId1,
  mockFullTaskPlanId2,
  mockFullTaskPlanId3
]

export const mockFullParentTaskPlan = mockFullTaskPlanId1
