import h from 'react-hyperscript'
import { compose } from 'recompose'
import { indexBy, prop, propEq, pipe, values, map, complement, filter, isNil, tap } from 'ramda'
import { connect as connectStyles } from 'react-fela'
import { reduxForm as connectForm, FormSection, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField } from 'redux-form-material-ui'
import { FormattedMessage } from 'dogstack/intl'

import Hint from '../../app/components/Hint'

import styles from '../styles/ProductIntentForm'

export default compose(
  connectStyles(styles),
  connectForm({
    form: 'productIntent'
  })
)(ProductIntentForm)

function ProductIntentForm (props) {
  const {
    styles,
    form,
    product,
    orderIntentsByPriceAgent,
    currentAgent,
    agents,
    handleSubmit
  } = props
  if (isNil(product)) return null
  const { resourceType, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  const renderPriceSpecs = RenderPriceSpecs({ styles, orderIntentsByPriceAgent, currentAgent, agents })

  return (
    h('form', {
      onSubmit: handleSubmit,
      id: form
    }, [
      h('div', {
        className: styles.container
      }, [
        h(FormSection, {
          name: 'priceSpecs'
        }, [
          renderPriceSpecs(priceSpecs)
        ])
      ])
    ])
  )
}

const RenderPriceSpecs = ({ styles, orderIntentsByPriceAgent, currentAgent, agents }) => {
  return pipe(
    map((priceSpec) => {
      const orderIntentsByAgent = orderIntentsByPriceAgent[priceSpec.id] || {}
      return h(ProductPriceSpec, {
        key: priceSpec.id,
        styles,
        priceSpec,
        orderIntentsByAgent,
        currentAgent,
        agents
      })
    }),
    values
  )
}

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
      className: styles.priceSpecContainer
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
        className: styles.quantityContainer
      }, [
        h(Field, {
          name: `priceSpec-${priceSpec.id}`,
          className: styles.quantityTextField,
          component: TextField,
          type: 'number'
        }),
        h(Hint, {
          messageId: 'ordering.whatIsAPricePointIntent',
          position: 'top-right',
          iconSize: '24px'
        })
      ]),
      renderOtherMemberOrderIntents(orderIntentsByAgent)
    ])
  )
}
