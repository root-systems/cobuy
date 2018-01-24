import test from 'ava'
import getDerivedOrderIntentsByOrderProductPrice from './getDerivedOrderIntentsByOrderProductPrice'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getDerivedOrderIntentsByOrderProductPrice: regroup derived orderIntents', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const expected = {
     1: {
       1: {
         1: [
           {
             agentId: 1,
             desiredQuantity: 3,
             id: 3,
             orderId: 1,
             priceSpecId: 1,
             productId: 1,
           },
           {
             agentId: 4,
             desiredQuantity: 5,
             id: 1,
             orderId: 1,
             priceSpecId: 1,
             productId: 1,
           }
         ],
         2: [
           {
             agentId: 1,
             desiredQuantity: 3,
             id: 3,
             orderId: 1,
             priceSpecId: 2,
             productId: 1,
           },
           {
             agentId: 4,
             desiredQuantity: 7,
             id: 2,
             orderId: 1,
             priceSpecId: 2,
             productId: 1,
           }
         ]
       }
     }
   }

  t.deepEqual(getDerivedOrderIntentsByOrderProductPrice(state), expected)
})
