import test from 'ava'
import getCurrentOrderId from './getCurrentOrderId'

test('getCurrentOrderId: can get orderId from taskPlan props', t => {
  const state = {}
  const props = { taskPlan: { params: { orderId: 23 } } }

  t.deepEqual(getCurrentOrderId(state, props), 23)
})

test('getCurrentOrderId: can get orderId from match props', t => {
  const state = {}
  const props = { match: { params: { orderId: 23 } } }

  t.deepEqual(getCurrentOrderId(state, props), 23)
})
