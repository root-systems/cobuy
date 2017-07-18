import createAction from '@f/create-action'

const payloadCtor = (cid, payload) => payload
const metaCtor = (cid) => ({ cid })

export const startOrder = createAction('ORDERING_START', payloadCtor, metaCtor)
