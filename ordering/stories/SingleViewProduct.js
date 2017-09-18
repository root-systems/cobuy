import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import h from 'react-hyperscript'

import SingleViewProduct from '../components/SingleViewProduct'

// https://github.com/root-systems/cobuy/wiki/Models
const mockProductInfo = {
  id: 1,
  name: 'crayons',
  description: 'these are crayons. look at all the pretty colours! they are made of beeswax. you could probably eat them and not die.',
  image: 'http://www.mercurius-australia.com/site/images/1250623.jpg',
  priceSpecifications: [
    {
      id: 1,
      productId: 1,
      minimum: '10',
      price: '9.99',
      currency: 'NZD'
    },
    {
      id: 2,
      productId: 1,
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
