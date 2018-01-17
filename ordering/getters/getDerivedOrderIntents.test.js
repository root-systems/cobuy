import test from 'ava'
import getDerivedOrderIntents from './getDerivedOrderIntents'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getDerivedOrderIntents: generate correct derived orderIntents', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const expected = {
     1: {
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
           2: {
             agentId: 1,
             desiredQuantity: 3,
             id: 3,
             orderId: 1,
             priceSpecId: 2,
             productId: 1,
           },
         },
       },
       4: {
         1: {
           1: {
             agentId: 4,
             desiredQuantity: 5,
             id: 1,
             orderId: 1,
             priceSpecId: 1,
             productId: 1,
           },
           2: {
             agentId: 4,
             desiredQuantity: 7,
             id: 2,
             orderId: 1,
             priceSpecId: 2,
             productId: 1,
           },
         },
       },
     },
   }

  t.deepEqual(getDerivedOrderIntents(state), expected)
})
