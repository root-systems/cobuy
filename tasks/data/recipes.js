import SetupGroupTask from '../components/SetupGroupTask'
import SetupSupplierTask from '../components/SetupSupplierTask'

export const setupGroup = {
  id: 'setupGroup',
  Component: SetupGroupTask
}

export const setupSupplier = {
  id: 'setupSupplier',
  Component: SetupSupplierTask
}

export const finishPrereqs = {
  id: 'finishPrereqs',
  taskRecipes: [
    setupGroup,
    setupSupplier
  ]
}
