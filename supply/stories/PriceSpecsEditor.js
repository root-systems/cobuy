import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PriceSpecsEditor from '../components/PriceSpecsEditor'

const resourceType = {
  id: 1,
  name: 'box of pencils',
  unit: 'each',
  items: [
    {
      quantity: {
        value: '100',
        unit: 'each'
      },
      resourceType: {
        id: 2,
        name: 'pencil'
      }
    },
    {
      quantity: {
        value: '1',
        unit: 'each'
      },
      resourceType: {
        id: 3,
        name: 'box'
      }
    }
  ]
}

const priceSpecs = [
  {
    minimum: '1',
    price: '30',
    currency: 'nzd'
  },
  {
    minimum: '10',
    price: '25',
    currency: 'nzd'
  },
  {
    minimum: '100',
    price: '20',
    currency: 'nzd'
  }
]

storiesOf('supply.PriceSpecsEditor', module)
  .add('empty', () => (
    h(PriceSpecsEditor, {
      resourceType,
      priceSpecs: null,
      onSubmit: action('submit')
    })
  ))
  .add('one', () => (
    h(PriceSpecsEditor, {
      resourceType,
      priceSpecs: [priceSpecs[0]],
      onSubmit: action('submit')
    })
  ))
  .add('many', () => (
    h(PriceSpecsEditor, {
      resourceType,
      priceSpecs,
      onSubmit: action('submit')
    })
  ))
