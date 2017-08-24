import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { reduxForm, Field } from 'redux-form'
import { action } from '@storybook/addon-actions'

import ProductEditor from '../components/ProductEditor'

storiesOf('supply.ProductEditor', module)
  .add('carton of eggs', () => (
    h(ProductEditor, {
      product: {
        resourceType: {
          id: 3,
          unit: 'each',
          name: 'carton of eggs',
          items: [
            {
              quantity: {
                value: '1',
                unit: 'each'
              },
              resourceTypeId: 2
            },
            {
              quantity: {
                value: '12',
                unit: 'each'
              },
              resourceTypeId: 1
            }
          ]
        },
        priceSpecs: [
          {
            minimum: '1',
            price: '10',
            currency: 'nzd'
          },
          {
            minimum: '10',
            price: '8',
            currency: 'nzd'
          },
          {
            minimum: '100',
            price: '6',
            currency: 'nzd'
          }
        ]
      },
      resourceTypes: {
        1: { id: 1, name: 'egg' },
        2: { id: 2, name: 'carton' }
      },
      onSubmit: action('submit')
    })
  ))
