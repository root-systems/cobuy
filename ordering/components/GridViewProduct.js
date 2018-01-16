import { compose } from 'recompose'
import { merge, isNil, sortBy, pipe, path, defaultTo } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/GridViewProduct'

const getQuantityForAgent = ({ currentAgent, orderIntentsByAgentPrice, applicablePriceSpec }) => {
  return pipe(
    path([currentAgent.id, applicablePriceSpec.id, 'desiredQuantity']),
    defaultTo('0')
  )(orderIntentsByAgentPrice)
}

function GridViewProduct (props) {
  const {
    styles,
    product,
    onNavigate,
    currentAgent,
    applicablePriceSpec,
    collectiveQuantity,
    orderIntentsByAgentPrice
  } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  const yourQuantity = getQuantityForAgent({ currentAgent, orderIntentsByAgentPrice, applicablePriceSpec })

  return (
    h('div', {
      className: styles.container,
      onClick: (ev) => {
        onNavigate(product)
      }
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
          description // TODO (mw) this should be truncated to number of characters then ...
        ]),
        h('p', {
          className: styles.groupQuantityText
        }, [
          h(FormattedMessage, {
            id: 'ordering.groupQuantity',
            className: styles.messageText,
            values: {
              quantity: collectiveQuantity
            }
          })
        ]),
        h('p', {
          className: styles.yourQuantityText
        }, [
          h(FormattedMessage, {
            id: 'ordering.yourQuantity',
            className: styles.messageText,
            values: {
              quantity: yourQuantity
            }
          })
        ]),
        h('p', {
          className: styles.priceText
        }, [
          h(FormattedMessage, {
            id: 'ordering.fromPrice',
            className: styles.messageText,
            values: {
              currency: applicablePriceSpec.currency,
              price: applicablePriceSpec.price
            }
          })
        ])
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(GridViewProduct)
