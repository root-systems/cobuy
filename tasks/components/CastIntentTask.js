import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import MemberIntentField from '../../ordering/components/MemberIntentField'

// import styles from '../styles/CastIntentTask'

const avoOffering = {
  resourceType: {
    name: 'crate of avocados',
    items: [
      {
        resourceType: {
          name: 'avocado'
        },
        quantity: {
          step: '1',
          value: '24',
          unit: 'each'
        }
      },
      {
        resourceType: {
          name: 'crate'
        },
        quantity: {
          value: '1',
          unit: 'each'
        }
      }
    ]
  },
  priceSpecifications: [
    {
      minimum: '0',
      price: '100',
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
        component: MemberIntentField,
        offering: avoOffering
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

