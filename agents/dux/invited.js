// TODO: IK: maybe rename this / move somewhere else
import createAction from '@f/create-action'
import { push } from 'react-router-redux'

import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'

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
      // TODO: IK: this should probably be a util function or somthing ramda-smart
      function onlyCid (action) {
        return action.meta.cid === cid
      }

      const tokenConsumesComplete$ = action$.ofType(tokenConsumes.complete.type).filter(onlyCid).take(1)
      const tokenConsumesSet$ = action$.ofType(tokenConsumes.set.type).filter(onlyCid)
      const signInSuccess$ = action$.ofType(authentication.signInSuccess.type).filter(onlyCid).take(1)

      const password = payload.password
      const patchPasswordPayload = { jwt: payload.jwt, payload: { data: { password } } }

      console.log('patchPasswordPayload', patchPasswordPayload)

      return Observable.merge(
        Observable.of(tokenConsumes.create(cid, patchPasswordPayload)),
        tokenConsumesComplete$
          .withLatestFrom(tokenConsumesSet$, (success, set) => set.payload.data)
          .mergeMap(({ result: { email } }) => {
            return Observable.of(authentication.signIn(cid, { strategy: 'local', email, password }))
          }),
        signInSuccess$.mapTo(push('/')) // TODO this should be configurable
      )
    })
}
