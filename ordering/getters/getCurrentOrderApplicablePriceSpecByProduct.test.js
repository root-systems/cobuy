import test from 'ava'
import getCurrentOrderApplicablePriceSpecByProduct from './getCurrentOrderApplicablePriceSpecByProduct'
import { mockOrderIntents, mockPriceSpecs } from '../data/mock'

test('getCurrentOrderApplicablePriceSpecByProduct: generate correct applicable priceSpecs', t => {
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       currency: "nzd",
       id: 2,
       minimum: "10",
       price: "5",
       productId: 1,
     }
   }

  t.deepEqual(getCurrentOrderApplicablePriceSpecByProduct(state, props), expected)
})

test.todo('test for returning the smallest min priceSpec if no orderIntents cast yet')
test.todo('test for returning the smallest min priceSpec if no min reached yet')
