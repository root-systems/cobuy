import { storiesOf } from '@storybook/react'
import h from 'react-hyperscript'
import { values } from 'ramda'

import ProductPricePoints from '../components/ProductPricePoints'

storiesOf('ordering.ProductPricePoints', module)
  .add('1/2 met', () => (
    h(ProductPricePoints, {
      priceSpecs: [
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
      ],
      collectiveQuantityByPrice: {
        456: '15',
        457: '50'
      }
    })
  ))
  .add('2/3 met', () => (
    h(ProductPricePoints, {
      priceSpecs: [
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
        },
        {
          id: 458,
          productId: 188,
          minimum: '1000',
          price: '5.99',
          currency: 'NZD'
        }
      ],
      collectiveQuantityByPrice: {
        456: '150',
        457: '300',
        458: '500'
      }
    })
  ))
