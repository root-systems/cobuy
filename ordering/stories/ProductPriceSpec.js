import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import h from 'react-hyperscript'

import ProductPriceSpec from '../components/ProductPriceSpec'

// https://github.com/root-systems/cobuy/wiki/Models
const mockPriceSpec = {
  minimum: '100',
  price: '7.99',
  currency: 'NZD'
}

storiesOf('ordering.ProductPriceSpec', module)
  .add('default', () => (
    h(ProductPriceSpec, {
      priceSpec: mockPriceSpec
    })
  ))
