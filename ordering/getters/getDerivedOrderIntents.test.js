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

test.todo('test for case where isEmpty(allPriceSpecsForProduct) if this in fact is necessary guard logic?')

test('getDerivedOrderIntents: if agent has no intent at low minimum / high price priceSpec, do not derive intent for that priceSpec', t => {
  const mockOrderIntentsNoDesiredQuantityAtLowMinPriceSpec = {
    "1": {
      "id": 1,
      "agentId": 4,
      "desiredQuantity": 5,
      "productId": 1,
      "priceSpecId": 1,
      "orderId": 1
    },
    "2": {
      "id": 2,
      "agentId": 4,
      "desiredQuantity": 7,
      "productId": 1,
      "priceSpecId": 2,
      "orderId": 1
    },
    "3": {
      "id": 3,
      "agentId": 1,
      "desiredQuantity": 2,
      "productId": 1,
      "priceSpecId": 2,
      "orderId": 1
    }
  }
  const state = { orderIntents: mockOrderIntentsNoDesiredQuantityAtLowMinPriceSpec, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       1: {
         1: {
           2: {
             agentId: 1,
             desiredQuantity: 2,
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

  t.deepEqual(getDerivedOrderIntents(state, props), expected)
})
