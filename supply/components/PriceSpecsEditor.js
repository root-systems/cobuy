import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm, FieldArray, Field } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { merge } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/PriceSpecsEditor'

const PriceSpecsEditor = (props) => {
  const { resourceType = {} } = props
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    form: `priceSpecs-${id}`
  })
  return h(PriceSpecsForm, nextProps)
}

export default PriceSpecsEditor

const PriceSpecsForm = compose(
  connectFela(styles),
  reduxForm({})
)(props => {
  const { styles, handleSubmit, priceSpecs } = props
  return (
    h('form', {
      onSubmit: handleSubmit,
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
        component: PriceSpecs,
        styles
      })
    ])
  )
})

const PriceSpecs = (props) => {
  const { fields, styles } = props
  return (
    h('div', {
      className: styles.priceSpecsContainer
    }, [
      fields.map((priceSpec, index) => (
        h(PriceSpec, {
          key: index,
          priceSepc,
          removePriceSpec: () => fields.remove(index),
          styles
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
  const { styles, priceSpec, removePriceSpec } = props

  return (
    h('div', {
      className: styles.priceSpecContainer
    }, [
      h(Field, {
        name: `${priceSpec}.price`,
        floatingTextLabel: (
          h(FormattedMessage, {
            id: 'supply.price',
            className: styles.labelText
          })
        ),
        component: TextField
      }),
      h(Field, {
        name: `${price}.currency`,
        floatingTextLabel: (
          h(FormattedMessage, {
            id: 'supply.currency',
            className: styles.labelText
          })
        ),
        component: SelectField
      }),
      h(Field, {
        name: `${price}.minimum`,
        floatingTextLabel: (
          h(FormattedMessage, {
            id: 'supply.minimum',
            className: styles.labelText
          })
        ),
        component: TextField
      }),
      h(RaisedButton, {
        type: 'button',
        className: styles.removePriceSpecButton,
        onClick: () => removePriceSpec()
      }, [
        h(FormattedMessage, {
          id: 'supply.removePriceSpec',
          className: styles.buttonText
        })
      ])
    ])
  )
}
