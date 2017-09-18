import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ProductPriceSpec'

function ProductPriceSpec (props) {
  const { styles, priceSpec } = props

  return (
    h('div', {
      className: styles.container
    }, [
      h(FormattedMessage, {
        id: 'ordering.priceSpec',
        className: styles.priceSpecText,
        values: {
          minimum: priceSpec.minimum,
          price: priceSpec.price,
          currency: priceSpec.currency
        }
      }),
      h('div', {
        className: styles.qtyContainer
      }, [
        h(Field, {
          name: priceSpec.minimum,
          className: styles.qtyTextField,
          component: TextField,
          type: 'number'
        })
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ProductPriceSpec)
