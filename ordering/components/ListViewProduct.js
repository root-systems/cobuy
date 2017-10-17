import { compose } from 'recompose'
import { merge, isNil, sortBy } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ListViewProduct'

 const sortPriceSpecs = sortBy((priceSpec) => {
   console.log(priceSpec, 'inside func')
   return priceSpec.price
 })

function ListViewProduct (props) {
  const { styles, product } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType
  const sortedPriceSpecs = sortPriceSpecs(priceSpecs)
  return (
    h('div', {
      className: styles.container
    }, [
      h('div', {
        className: styles.imageContainer
      }, [
        h('img', {
          className: styles.image,
          src: image
        })
      ]),
      h('div', {
        className: styles.textContainer
      }, [
        h('h3', {
          className: styles.nameText
        }, [
          name
        ]),
        h('p', {
          className: styles.productText
        }, [
          description
        ]),
        h('p', {
          className: styles.priceText
        }, [
          h(FormattedMessage, {
            id: 'ordering.fromPrice',
            className: styles.fromText,
            values: {
              currency: sortedPriceSpecs[0].currency,
              price: sortedPriceSpecs[0].price
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
