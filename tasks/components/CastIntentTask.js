import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import ProductList from '../../ordering/components/ProductList'

// import styles from '../styles/CastIntentTask'


const IntentForm = props => {
  const { handleSubmit, products, name } = props
  return (
    h('form', {
      onSubmit: () => { console.log('lunch') }
    }, [
      h(Field, {
        name: 'intent',
        component: ProductList,
        products: props.products
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
