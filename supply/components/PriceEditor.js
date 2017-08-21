import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm, FieldArray, Field } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { merge } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/PriceEditor'

const PriceEditor = (props) => {
  const { resourceType = {} } = props
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    form: `price-${id}`
  })
  return h(PriceForm, nextProps)
}

export default PriceEditor

const PriceForm = compose(
  connectFela(styles),
  reduxForm({})
)(props => {
  const { styles, handleSubmit, prices } = props
  return (
    h('form', {
      onSubmit: handleSubmit,
      className: styles.container
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'supply.prices',
          className: styles.labelText
        })
      ]),
      h(FieldArray, {
        component: Prices,
        styles
      })
    ])
  )
})

const Prices = (props) => {
  const { fields, styles } = props
  return (
    h('div', {
      className: styles.pricesContainer
    }, [
      fields.map((price, index) => (
        h(Price, {
          key: index,
          price,
          removePrice: () => fields.remove(index),
          styles
        })
      )),
      h(RaisedButton, {
        type: 'button',
        className: styles.addPriceButton,
        onClick: () => fields.push({})
      }, [
        h(FormattedMessage, {
          id: 'supply.addPrice',
          className: styles.buttonText
        })
      ])
    ])
  )
}

const Price = (props) => {
  const { styles, price, removePrice } = props

  return (
    h('div', {
      className: styles.priceContainer
    }, [
      h(Field, {
        name: `${price}.price`,
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
        className: styles.removePriceButton,
        onClick: () => removePrice()
      }, [
        h(FormattedMessage, {
          id: 'supply.removePrice',
          className: styles.buttonText
        })
      ])
    ])
  )
}
