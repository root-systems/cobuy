import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import SingleViewProduct from '../../ordering/components/SingleViewProduct'

// import styles from '../styles/CastIntentTask'

const mockProductInfo = {
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
}

const IntentForm = props => {
  const { handleSubmit } = props
  return (
    h('form', {
      onSubmit: () => { console.log('lunch') }
    }, [
      h(Field, {
        name: 'intent',
        component: SingleViewProduct,
        product: mockProductInfo
      })
    ])
  )
}

const CastIntentTask = compose(
  connectForm({ form: 'memberIntent' }),
  // connectStyles(styles)
)(props => {
  const { actions, currentAgent } = props

  if(isNil(currentAgent)) {
    return null
  }

  return h(IntentForm, props)
})

export default CastIntentTask
