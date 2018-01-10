import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm, Field } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/PriceSpecsEditor'

export default compose(
  connectFela(styles)
)(PriceSpecsEditor)

function PriceSpecsEditor (props) {
  const { styles, fields } = props
  return (
    h('div', {
      className: styles.priceSpecsContainer
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'supply.priceSpecs',
          className: styles.labelText
        })
      ]),
      fields.map((field, index) => (
        h(PriceSpec, {
          key: index,
          field,
          removeField: () => fields.remove(index),
          styles
        })
      )),
      h(RaisedButton, {
        type: 'button',
        className: styles.addPriceSpecButton,
        secondary: true,
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
  const { styles, field, removeField } = props

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
        secondary: true,
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
