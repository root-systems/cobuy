import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { reduxForm, Field } from 'redux-form'
import { action } from '@storybook/addon-actions'

import Product from '../components/Product'

const product = {
  resourceType: undefined,
  prices: []
}

storiesOf('supply.Product', module)
  .add('basic', () => (
    h(Product, {
      product,
      onSubmit: action('submit')
    })
  ))
