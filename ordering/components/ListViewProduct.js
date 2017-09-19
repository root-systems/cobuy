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
            id: 'ordering.from',
            className: styles.fromText
          }),
          ` $${product.priceSpecifications[0].price}`
        ])
      ])
    ])
  )
}

export default pipe(
  connectFela(styles)
)(ListViewProduct)
