import React from 'react'
import { pipe, map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm, Field } from 'redux-form'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ProductPriceSpec'

function ProductPriceSpec (props) {
  const { styles, priceSpec } = props

  return (
    h('div', {
      className: styles.container
    }, [
      h('div', {
        className: styles.nameContainer
      }, [
        h('h3', {
          className: styles.nameText
        }, priceSpec.price)
      ]),
      h('div', {
        className: styles.valuesContainer
      })
    ])
  )
}

export default pipe(
  connectFela(styles)
)(ProductPriceSpec)
