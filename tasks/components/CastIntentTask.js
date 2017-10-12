import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import SingleViewProduct from '../../ordering/components/SingleViewProduct'

// import styles from '../styles/CastIntentTask'


const IntentForm = props => {
  const { handleSubmit, products, name } = props
  console.log(props, 'the props here')
  return (
    h('form', {
      onSubmit: () => { console.log('lunch') }
    }, [
      h(Field, {
        name: 'intent',
        component: SingleViewProduct,
        product: props.products
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
