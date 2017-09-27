import { storiesOf } from '@storybook/react'
import h from 'react-hyperscript'
import mockProductList from './mock/products'

import ProductList from '../components/ProductList'

storiesOf('ordering.ProductList', module)
  .add('default', () => (
    h(ProductList, {
      products: mockProductList
    })
  ))
