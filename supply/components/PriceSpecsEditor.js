import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm, FieldArray, Field } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { merge, pipe, prop } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/PriceSpecsEditor'

const PriceSpecsEditor = (props) => {
  const {
    resourceType,
    priceSpecs
  } = props
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    form: `priceSpecs-${id}`,
    initialValues: {
      priceSpecs
    }
  })
  return h(PriceSpecsForm, nextProps)
}

export default PriceSpecsEditor

const PriceSpecsForm = compose(
  connectFela(styles),
  reduxForm({})
)(props => {
  const { styles, resourceType, handleSubmit, onSubmit } = props
  return (
    h('form', {
      onSubmit: handleSubmit(pipe(
        prop('priceSpecs'),
        onSubmit
      )),
      className: styles.container
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'supply.priceSpecs',
          className: styles.labelText
        })
      ]),
      h(FieldArray, {
        name: 'priceSpecs',
        component: PriceSpecs,
        styles,
        resourceType
      }),
      h(RaisedButton, {
        type: 'submit',
        className: styles.submitButton
      }, [
        h(FormattedMessage, {
          id: 'supply.savePriceSpecs',
          className: styles.buttonText
        })
      ])
    ])
  )
})

const PriceSpecs = (props) => {
  const { styles, resourceType, fields } = props
  return (
    h('div', {
      className: styles.priceSpecsContainer
    }, [
      fields.map((field, index) => (
        h(PriceSpec, {
          key: index,
          field,
          removeField: () => fields.remove(index),
          styles,
          resourceType
        })
      )),
      h(RaisedButton, {
        type: 'button',
        className: styles.addPriceSpecButton,
        onClick: () => fields.push({})
      }, [
        h(FormattedMessage, {
          id: 'supply.addPriceSpec',
          className: styles.buttonText
        })
      ])
    ])
  )
}

const PriceSpec = (props) => {
  const { styles, resourceType, field, removeField } = props

  return (
    h('div', {
      className: styles.priceSpecContainer
    }, [
      h(Field, {
        name: `${field}.minimum`,
        component: TextField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'quantity.minimum',
            className: styles.labelText
          })
        )
      }),
      h(TextField, {
        value: resourceType.unit,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'quantity.unit',
            className: styles.labelText
          })
        ),
        disabled: true
      }),
      h(Field, {
        name: `${field}.price`,
        component: TextField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'supply.price',
            className: styles.labelText
          })
        )
      }),
      h(Field, {
        name: `${field}.currency`,
        component: SelectField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'supply.currency',
            className: styles.labelText
          })
        )
      }, [
        h(MenuItem, {
          value: 'nzd',
          primaryText: (
            h(FormattedMessage, {
              id: 'currency.nzd',
              className: styles.labelText
            })
          )
        })
      ]),
      h(RaisedButton, {
        type: 'button',
        className: styles.removePriceSpecButton,
        onClick: () => removeField()
      }, [
        h(FormattedMessage, {
          id: 'supply.removePriceSpec',
          className: styles.buttonText
        })
      ])
    ])
  )
}
