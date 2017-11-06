import h from 'react-hyperscript'
import { withState, withHandlers, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { isNil } from 'ramda'
import { pipe, values, map, merge, propOr, length, gte, __, not } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'

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

export default PriceSpec
