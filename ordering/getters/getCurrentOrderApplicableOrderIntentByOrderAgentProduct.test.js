import test from 'ava'
import getCurrentOrderApplicableOrderIntentByOrderAgentProduct from './getCurrentOrderApplicableOrderIntentByOrderAgentProduct'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getCurrentOrderApplicableOrderIntentByOrderAgentProduct: get correct applicable orderIntents', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       1: {
         1: {
           agentId: 1,
           desiredQuantity: 3,
           id: 3,
           orderId: 1,
           priceSpecId: 2,
           productId: 1,
         },
       },
       4: {
         1: {
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

  t.deepEqual(getCurrentOrderApplicableOrderIntentByOrderAgentProduct(state, props), expected)
})
