// import React from 'react'
import { merge, pipe } from 'ramda'
import { connect as connectFela } from 'react-fela'
import BigMath from 'bigmath'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ListViewProduct'

function ListViewProduct (props) {
  const { styles, product } = props

  return (
    h('div', {
      className: styles.container
    }, product.name)
  )
}

export default pipe(
  connectFela(styles)
)(ListViewProduct)
