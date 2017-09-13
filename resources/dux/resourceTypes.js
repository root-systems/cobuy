import createModule from 'feathers-action'

const module = createModule('resourceTypes')

export const actions = module.actions
export const updater = module.updater
export const epic = module.epic
