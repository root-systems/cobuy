import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'
import h from 'react-hyperscript'

import ProductList from '../components/ProductList'

// https://github.com/root-systems/cobuy/wiki/Models
const mockProductList = [
  {
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
  },
  {
    name: 'coloured pencils',
    description: 'these are pencils that are coloured',
    image: 'http://thewoodenwagon.com/Merchant2/graphics/00000001/ACST85090912-2.jpg',
    priceSpecifications: [
      {
        minimum: '10',
        price: '12.99',
        currency: 'NZD'
      },
      {
        minimum: '100',
        price: '9.99',
        currency: 'NZD'
      }
    ]
  },
  {
    name: 'workbooks',
    description: 'these are workbooks',
    image: 'http://jodihildebrandt.com/wp-content/uploads/2013/02/colored_workbooks1.jpg',
    priceSpecifications: [
      {
        minimum: '12',
        price: '1.99',
        currency: 'NZD'
      },
      {
        minimum: '144',
        price: '1.29',
        currency: 'NZD'
      }
    ]
  }
]

storiesOf('ordering.ProductList', module)
  .add('default', () => (
    h(ProductList, {
      products: mockProductList
    })
  ))
