import SetupGroupTask from '../containers/SetupGroupTask'
import SetupSupplierTask from '../containers/SetupSupplierTask'
import CreateProfileTask from '../containers/CreateProfileTask'
import StartOrderTask from '../containers/StartOrderTask'
import CastIntentTask from '../containers/CastIntentTask' 

export const setupGroup = {
  id: 'setupGroup',
  Component: SetupGroupTask,
  childTaskRecipes: []
}

export const setupSupplier = {
  id: 'setupSupplier',
  Component: SetupSupplierTask,
  childTaskRecipes: []
}

export const finishPrereqs = {
  id: 'finishPrereqs',
  childTaskRecipes: [
    setupGroup,
    setupSupplier
  ]
}

export const startOrder = {
  id: 'startOrder',
  Component: StartOrderTask,
  childTaskRecipes: []
}

export const completeOrderSetupWithPrereqs = {
  id: 'completeOrderSetupWithPrereqs',
  childTaskRecipes: [
    finishPrereqs,
    startOrder
  ]
}

export const completeOrderSetup = {
  id: 'completeOrderSetup',
  childTaskRecipes: [
    startOrder
  ]
}

export const createProfile = {
  id: 'createProfile',
  Component: CreateProfileTask,
  childTaskRecipes: []
}

export const castIntent = {
  id: 'castIntent',
  Component: CastIntentTask,
  childTaskRecipes: []
}
