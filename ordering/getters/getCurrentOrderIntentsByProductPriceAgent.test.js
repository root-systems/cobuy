import test from 'ava'
import getCurrentOrderIntentsByProductPriceAgent from './getCurrentOrderIntentsByProductPriceAgent'
import { mockOrderIntents } from '../data/mock'

test('getCurrentOrderIntentsByProductPriceAgent: orderIntents exist on state', t => {
  const state = { orderIntents: mockOrderIntents }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       1: {
         1: {
           agentId: 1,
           desiredQuantity: 3,
           id: 3,
           orderId: 1,
           priceSpecId: 1,
           productId: 1,
         },
         4: {
           agentId: 4,
           desiredQuantity: 5,
           id: 1,
           orderId: 1,
           priceSpecId: 1,
           productId: 1,
         },
       },
       2: {
         4: {
           agentId: 4,
           desiredQuantity: 7,
           id: 2,
           orderId: 1,
           priceSpecId: 2,
           productId: 1,
         },
       },
     },
   }

  t.deepEqual(getCurrentOrderIntentsByProductPriceAgent(state, props), expected)
})

test('getCurrentOrderIntentsByProductPriceAgent: return empty obj if no intents', t => {
  const state = { orderIntents: {} }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {}

  t.deepEqual(getCurrentOrderIntentsByProductPriceAgent(state, props), expected)
})
