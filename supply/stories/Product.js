import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { reduxForm, Field } from 'redux-form'
import { action } from '@storybook/addon-actions'

import Product from '../components/Product'

const ProductForm = props => {
  const { handleSubmit } = props
  return (
    h('form', {
      onSubmit: handleSubmit
    }, [
      h(Product, {})
    ])
  )
}
const ConnectedProductForm = reduxForm({
  form: 'product',
  initialValues: {}
})(ProductForm)

storiesOf('supply.Product', module)
  .add('basic', () => (
    h(ConnectedProductForm, {
      onSubmit: action('submit')
    })
  ))
