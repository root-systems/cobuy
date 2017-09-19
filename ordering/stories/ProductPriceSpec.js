import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'
import h from 'react-hyperscript'

import ProductPriceSpec from '../components/ProductPriceSpec'

// https://github.com/root-systems/cobuy/wiki/Models
const mockPriceSpec = {
  minimum: '100',
  price: '7.99',
  currency: 'NZD'
}

const PriceSpecForm = props => {
  const { handleSubmit } = props
  return (
    h('form', {
      onSubmit: handleSubmit
    }, [
      h(Field, {
        name: 'price spec',
        component: ProductPriceSpec,
        priceSpec: mockPriceSpec
      })
    ])
  )
}

const ConnectedPriceSpecForm = reduxForm({ form: 'priceSpec' })(PriceSpecForm)

storiesOf('ordering.ProductPriceSpec', module)
  .add('default', () => (
    h(ConnectedPriceSpecForm)
  ))
