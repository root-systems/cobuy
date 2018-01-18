import test from 'ava'
import getCurrentOrderCollectiveQuantityByProductPrice from './getCurrentOrderCollectiveQuantityByProductPrice'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getCurrentOrderCollectiveQuantityByProductPrice: generate correct collective quantities for current order', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       1: 8,
       2: 10
     }
   }

  t.deepEqual(getCurrentOrderCollectiveQuantityByProductPrice(state, props), expected)
})
