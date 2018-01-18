import test from 'ava'
import getDerivedOrderIntentsUngrouped from './getDerivedOrderIntentsUngrouped'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getDerivedOrderIntentsUngrouped: flatten derived orderIntents', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const expected = [
   {
     agentId: 1,
     desiredQuantity: 3,
     id: 3,
     orderId: 1,
     priceSpecId: 1,
     productId: 1,
   },
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
     desiredQuantity: 5,
     id: 1,
     orderId: 1,
     priceSpecId: 1,
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

  t.deepEqual(getDerivedOrderIntentsUngrouped(state), expected)
})
