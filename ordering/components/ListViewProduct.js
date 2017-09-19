import { compose } from 'recompose'
import { merge } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ListViewProduct'

function ListViewProduct (props) {
  const { styles, product } = props

  return (
    h('div', {
      className: styles.container
    }, [
      h('div', {
        className: styles.imageContainer
      }, [
        h('img', {
          className: styles.image,
          src: product.image
        })
      ]),
      h('div', {
        className: styles.textContainer
      }, [
        h('h3', {
          className: styles.nameText
        }, [
          product.name
        ]),
        h('p', {
          className: styles.productText
        }, [
          product.description
        ]),
        h('p', {
          className: styles.priceText
        }, [
          h(FormattedMessage, {
            id: 'ordering.fromPrice',
            className: styles.fromText,
            values: {
              currency: product.priceSpecs[0].currency,
              price: product.priceSpecs[0].price
            }
          })
        ])
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ListViewProduct)
