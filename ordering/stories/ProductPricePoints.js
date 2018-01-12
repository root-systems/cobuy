import { storiesOf } from '@storybook/react'
import h from 'react-hyperscript'
import { values } from 'ramda'

import ProductPricePoints from '../components/ProductPricePoints'

const priceSpecs = [
  {
    id: 456,
    productId: 188,
    minimum: '10',
    price: '9.99',
    currency: 'NZD'
  },
  {
    id: 457,
    productId: 188,
    minimum: '100',
    price: '7.99',
    currency: 'NZD'
  }
]

const props = {
  priceSpecs,
  applicablePriceSpec: priceSpecs[0],
  collectiveQuantity: '15',
  collectiveQuantityByPrice: {
    456: '15',
    457: '50'
  }
}

storiesOf('ordering.ProductPricePoints', module)
  .add('default', () => (
    h(ProductPricePoints, props)
  ))
