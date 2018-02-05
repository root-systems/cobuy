import test from 'ava'
import getOrderIntentsByOrderProductAgentPrice from './getOrderIntentsByOrderProductAgentPrice'
import { mockOrderIntents } from '../data/mock'

test('getOrderIntentsByOrderProductAgentPrice: orderIntents exist on state', t => {
  const state = { orderIntents: mockOrderIntents }
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
         },
         4: {
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

  t.deepEqual(getOrderIntentsByOrderProductAgentPrice(state), expected)
})
