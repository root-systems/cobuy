import SetupGroupTask from '../containers/SetupGroupTask'
import SetupSupplierTask from '../components/SetupSupplierTask'

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
