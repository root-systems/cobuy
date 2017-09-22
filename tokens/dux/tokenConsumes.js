import createModule from 'feathers-action'

const module = createModule('tokenConsumes')

export const actions = module.actions
export const updater = module.updater
export const epic = module.epic
