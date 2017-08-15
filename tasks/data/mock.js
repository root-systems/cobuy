import { finishPrereqs, setupGroup, setupSupplier } from '../data/recipes'

const person = {
  id: 1,
  profile: {
    name: 'Sam'
  }
}

const group = {
  id: 2,
  profile: {
    name: 'Friends Who Buy Together'
  }
}

const finishPrereqsTaskPlan = {
  id: 1,
  parentTaskPlanId: null,
  assigneeId: person.id,
  taskRecipeId: 'finishPrereqs',
  params: {
    contextAgentId: group.id
  }
}

const setupGroupTaskPlan = {
  id: 2,
  parentTaskPlanId: 1,
  assigneeId: person.id,
  taskRecipeId: 'setupGroup',
  params: {
    contextAgentId: group.id
  }
}

const setupSupplierTaskPlan = {
  id: 3,
  parentTaskPlanId: 1,
  assigneeId: person.id,
  taskRecipeId: 'setupSupplier',
  params: {
    contextAgentId: group.id
  }
}

const taskWork = {
  id: 1,
  taskPlanId: 1,
  taskRecipeId: 'finishPrereqs',
  actorId: person.id, // TODO
  params: {
    contextAgentId: group.id
  }
}

const mockAgents = {
  1: person,
  2: group
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
    assignee: person,
    taskRecipeId: 'finishPrereqs',
    taskRecipe: finishPrereqs,
    params: {
      contextAgent: group
    }
  },
  2: {
    id: 2,
    parentTaskPlanId: 1,
    assignee: person,
    taskRecipeId: 'setupGroup',
    taskRecipe: setupGroup,
    params: {
      contextAgent: group
    }
  },
  3: {
    id: 3,
    parentTaskPlanId: 1,
    assignee: person,
    taskRecipeId: 'setupSupplier',
    taskRecipe: setupSupplier,
    params: {
      contextAgent: group
    }
  }
}

export const mockEnhancedTaskPlansByParentId = { 1:
   [ { id: 2,
       parentTaskPlanId: 1,
       assignee: person,
       taskRecipeId: 'setupGroup',
       taskRecipe: setupGroup },
     { id: 3,
       parentTaskPlanId: 1,
       assignee: person,
       taskRecipeId: 'setupSupplier',
       taskRecipe: setupSupplier } ],
  null:
   [ { id: 1,
       parentTaskPlanId: null,
       assignee: person,
       taskRecipeId: 'finishPrereqs',
       taskRecipe: finishPrereqs } ] }

var mockFullTaskPlanId1 = {
  id: 1,
  parentTaskPlanId: null,
  assignee: person,
  taskRecipeId: 'finishPrereqs',
  taskRecipe:
  { id: 'finishPrereqs',
    childTaskRecipes: [ setupGroup, setupSupplier ] }
}

const mockFullTaskPlanId2 = {
  id: 2,
  parentTaskPlanId: 1,
  assignee: person,
  taskRecipeId: 'setupGroup',
  taskRecipe: setupGroup,
  childTaskPlans: [],
  parentTaskPlan: mockFullTaskPlanId1
}

const mockFullTaskPlanId3 = {
  id: 3,
  parentTaskPlanId: 1,
  assignee: person,
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
