import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'

import { startOrder } from './actions'

export default combineEpics(startOrderEpic)

export function startOrderEpic (action$, store, { feathers }) {
  return action$.ofType(startOrder.type)
    .switchMap(({ payload, meta: { cid }}) => {
      return Rx.Observable.concat(
        Rx.Observable.of({ type: 'TEST_TEST_TEST' })
      )
    })
}
