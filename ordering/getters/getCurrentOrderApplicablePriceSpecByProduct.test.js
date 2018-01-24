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

test('getCurrentOrderApplicablePriceSpecByProduct: return the smallest min priceSpec if no orderIntents cast yet', t => {
  const state = { orderIntents: {}, priceSpecs: mockPriceSpecs }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       currency: "nzd",
       id: 1,
       minimum: "1",
       price: "10",
       productId: 1,
     },
   }

  t.deepEqual(getCurrentOrderApplicablePriceSpecByProduct(state, props), expected)
})

test('getCurrentOrderApplicablePriceSpecByProduct: return the smallest min priceSpec if no min reached yet', t => {
  const mockPriceSpecsHighMinimums = {
    "1": {
      "id": 1,
      "productId": 1,
      "minimum": "100",
      "price": "10",
      "currency": "nzd"
    },
    "2": {
      "id": 2,
      "productId": 1,
      "minimum": "1000",
      "price": "5",
      "currency": "nzd"
    }
  }
  const state = { orderIntents: mockOrderIntents, priceSpecs: mockPriceSpecsHighMinimums }
  const props = { taskPlan: { params: { orderId: 1 } } }
  const expected = {
     1: {
       currency: "nzd",
       id: 1,
       minimum: "100",
       price: "10",
       productId: 1,
     },
   }

  t.deepEqual(getCurrentOrderApplicablePriceSpecByProduct(state, props), expected)
})
