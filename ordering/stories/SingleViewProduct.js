import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import h from 'react-hyperscript'

import SingleViewProduct from '../components/SingleViewProduct'

// https://github.com/root-systems/cobuy/wiki/Models
const mockProductInfo = {
  name: 'crayons',
  description: 'these are crayons',
  image: 'http://www.mercurius-australia.com/site/images/1250623.jpg',
  priceSpecifications: [
    {
      minimum: '10',
      price: '9.99',
      currency: 'NZD'
    },
    {
      minimum: '100',
      price: '7.99',
      currency: 'NZD'
    }
  ]
}

storiesOf('ordering.SingleViewProduct', module)
  .add('default', () => (
    h(SingleViewProduct, {
      product: mockProductInfo
    })
  ))
