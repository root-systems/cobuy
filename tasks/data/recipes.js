import SetupGroupTask from '../containers/SetupGroupTask'
import SetupSupplierTask from '../containers/SetupSupplierTask'
import CreateProfileTask from '../containers/CreateProfileTask'

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

export const createProfile = {
  id: 'createProfile',
  Component: CreateProfileTask,
  childTaskRecipes: []
}
