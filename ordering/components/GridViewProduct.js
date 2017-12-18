import { compose } from 'recompose'
import { merge, isNil, sortBy } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/GridViewProduct'

function ListViewProduct (props) {
  const { styles, product, onNavigate, applicablePriceSpec, collectiveQuantity } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

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
              currency: applicablePriceSpec.currency,
              price: applicablePriceSpec.price
            }
          })
        ])
      ]),
      h(FlatButton, {
        onClick: (ev) => {
          onNavigate(product)
        }
      },
      ['click here'])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ListViewProduct)
