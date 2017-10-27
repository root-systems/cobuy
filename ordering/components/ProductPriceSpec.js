import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import h from 'react-hyperscript'
import { indexBy, prop, propEq, pipe, values, map, complement, filter, isNil, tap } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ProductPriceSpec'

const indexById = indexBy(prop('id'))

const RenderOtherMemberOrderIntents = ({ styles, currentAgent, agents }) => {
  const agentsById = indexById(agents)
  return pipe(
    values,
    filter(complement(propEq('agentId', currentAgent.id))),
    filter(complement(isNil)),
    map(orderIntent => {
      const { agentId, desiredQuantity } = orderIntent
      const agent = agentsById[agentId]
      if (isNil(agent)) return null
      const { profile } = agent
      if (isNil(profile)) return null
      const { name } = profile
      return (
        h('li', {
          key: agentId
        }, [
          h(FormattedMessage, {
            id: 'ordering.memberIntent',
            className: styles.priceSpecText,
            values: {
              name,
              quantity: desiredQuantity
            }
          })
        ])
      )
    }),
    (elements) => {
      return h('ul', [
        elements
      ])
    }
  )
}

function ProductPriceSpec (props) {
  const { styles, priceSpec, orderIntentsByAgent, currentAgent, agents } = props

  const renderOtherMemberOrderIntents = RenderOtherMemberOrderIntents({ styles, currentAgent, agents })

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
          name: `priceSpec-${priceSpec.id}`,
          className: styles.qtyTextField,
          component: TextField,
          type: 'number'
        })
      ]),
      renderOtherMemberOrderIntents(orderIntentsByAgent)
    ])
  )
}

export default compose(
  connectFela(styles)
)(ProductPriceSpec)
