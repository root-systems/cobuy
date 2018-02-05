import test from 'ava'
import getSortedByMinPriceSpecsByProduct from './getSortedByMinPriceSpecsByProduct'
import { mockPriceSpecs } from '../../ordering/data/mock'

test('getSortedByMinPriceSpecsByProduct: sort grouped priceSpecs by minimum correctly', t => {
  const state = { priceSpecs: mockPriceSpecs }
  const expected = {
     1: [
      {
         currency: "nzd",
         id: 2,
         minimum: "10",
         price: "5",
         productId: 1,
       },
      {
         currency: "nzd",
         id: 1,
         minimum: "1",
         price: "10",
         productId: 1,
       },
     ],
   }

  t.deepEqual(getSortedByMinPriceSpecsByProduct(state), expected)
})
