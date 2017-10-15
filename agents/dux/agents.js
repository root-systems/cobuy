// TODO: IK: maybe rename this / move somewhere else
import createAction from '@f/create-action'

import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'

import { actions as tokenConsumes } from '../../tokens/dux/tokenConsumes'
import { authentication } from 'dogstack-agents/actions'

import { merge } from 'ramda'

// actions
const payloadCtor = (cid, payload) => payload
const metaCtor = (cid) => ({ cid })

export const invitedPatchPassword = createAction('INVITED_PATCH_PASSWORD', payloadCtor, metaCtor)

// epics
export default combineEpics(patchPasswordAndSignIn)

export function patchPasswordAndSignIn (action$, store, { feathers }) {
  return action$.ofType(invitedPatchPassword.type)
    .switchMap(({ payload, meta: { cid }}) => {
      const patchPasswordPayload = { jwt: payload.jwt, payload: { data: { password: payload.password } } }
      return Rx.Observable.merge(
        Rx.Observable.of(tokenConsumes.create(cid, patchPasswordPayload)),
        action$.ofType(tokenConsumes.start.type).filter((action) => action.meta.cid === cid).take(1)
      )
    })
    .do(console.log)
}
