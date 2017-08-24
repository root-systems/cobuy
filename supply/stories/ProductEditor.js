import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { reduxForm, Field } from 'redux-form'
import { action } from '@storybook/addon-actions'

import ProductEditor from '../components/ProductEditor'

const product = {
  resourceType: undefined,
  prices: []
}

storiesOf('supply.ProductEditor', module)
  .add('basic', () => (
    h(ProductEditor, {
      product,
      onSubmit: action('submit')
    })
  ))
