import createModule from 'feathers-action'

const module = createModule('priceSpecs')

export const actions = module.actions
export const updater = module.updater
export const epic = module.epic
