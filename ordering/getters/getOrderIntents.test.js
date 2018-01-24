import test from 'ava'
import getOrderIntents from './getOrderIntents'

test('getOrderIntents: orderIntents exist on state', t => {
  const state = { orderIntents: {} }

  t.deepEqual(getOrderIntents(state), {})
})
