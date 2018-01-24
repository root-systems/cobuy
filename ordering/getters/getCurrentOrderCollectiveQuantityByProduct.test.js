import test from 'ava'
import getCurrentOrderCollectiveQuantityByProduct from './getCurrentOrderCollectiveQuantityByProduct'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getCurrentOrderCollectiveQuantityByProduct: generate correct collective quantity per product for current order', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: 10
   }

  t.deepEqual(getCurrentOrderCollectiveQuantityByProduct(state, props), expected)
})
