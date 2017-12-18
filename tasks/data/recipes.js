import SetupGroupTask from '../containers/SetupGroupTask'
import SetupSupplierTask from '../containers/SetupSupplierTask'
import CreateProfileTask from '../containers/CreateProfileTask'
import StartOrderTask from '../containers/StartOrderTask'
import CloseOrderTask from '../containers/CloseOrderTask'
import CastIntentTask from '../containers/CastIntentTask'
import ViewOrderSummaryTask from '../containers/ViewOrderSummaryTask'

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

export const closeOrder = {
  id: 'closeOrder',
  Component: CloseOrderTask,
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

// TODO: IK: probably don't want this as a task in the future, just a UI into viewing the order summary for now
export const viewOrderSummary = {
  id: 'viewOrderSummary',
  Component: ViewOrderSummaryTask,
  childTaskRecipes: []
}

export const commitOrder = {
  id: 'commitOrder',
  childTaskRecipes: [
    closeOrder,
    viewOrderSummary
  ]
}
