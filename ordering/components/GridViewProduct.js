import { compose } from 'recompose'
import { merge, isNil, sortBy, pipe, path, defaultTo } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { FormattedMessage } from 'dogstack/intl'

import Hint from '../../app/components/Hint'

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
        className: styles.details
      }, [
        h('h3', {
          className: styles.name
        }, [
          name
        ]),
        h('p', {
          className: styles.description
        }, [
          description // TODO (mw) this should be truncated to number of characters then ...
        ])
      ]),
      h('div', {
        className: styles.context
      }, [
        h('p', {
          className: styles.price
        }, [
          h(FontIcon, {
            className: 'fa fa-dollar'
          }),
          h(FormattedMessage, {
            id: 'ordering.fromPrice',
            className: styles.messageText,
            values: {
              currency: applicablePriceSpec.currency,
              price: applicablePriceSpec.price
            }
          }),
          h(Hint, {
            messageId: 'ordering.whatIsCurrentPrice',
            iconButtonStyle: {
              height: 'unset',
              padding: 'unset'
            }
          })
        ]),
        h('p', {
          className: styles.groupQuantity
        }, [
          h(FontIcon, {
            className: 'fa fa-users'
          }),
          h(FormattedMessage, {
            id: 'ordering.groupQuantity',
            className: styles.messageText,
            values: {
              quantity: collectiveQuantity
            }
          }),
          h(Hint, {
            messageId: 'ordering.whatIsCurrentGroupQuantity',
            iconButtonStyle: {
              height: 'unset',
              padding: 'unset'
            }
          })
        ]),
        h('p', {
          className: styles.yourQuantity
        }, [
          h(FontIcon, {
            className: 'fa fa-user'
          }),
          h(FormattedMessage, {
            id: 'ordering.yourQuantity',
            className: styles.messageText,
            values: {
              quantity: yourQuantity
            }
          }),
          h(Hint, {
            messageId: 'ordering.whatIsYourCurrentQuantity',
            iconButtonStyle: {
              height: 'unset',
              padding: 'unset'
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
