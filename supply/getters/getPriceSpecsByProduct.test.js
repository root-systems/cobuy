import test from 'ava'
import getPriceSpecsByProduct from './getPriceSpecsByProduct'
import { mockPriceSpecs } from '../../ordering/data/mock'

test('getPriceSpecsByProduct: group priceSpecs correctly by product', t => {
  const state = { priceSpecs: mockPriceSpecs }
  const expected = {
     1: [
       {
         currency: "nzd",
         id: 1,
         minimum: "1",
         price: "10",
         productId: 1,
       },
       {
         currency: "nzd",
         id: 2,
         minimum: "10",
         price: "5",
         productId: 1,
       },
     ],
   }

  t.deepEqual(getPriceSpecsByProduct(state), expected)
})
