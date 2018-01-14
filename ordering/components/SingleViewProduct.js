import { compose } from 'recompose'
import { map, isNil, pipe, values, prop, reduce, max } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, FormSection } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/SingleViewProduct'
import ProductPricePoints from './ProductPricePoints'
import ProductPriceSpec from './ProductPriceSpec'
import ProductFacet from './ProductFacet'

const RenderPriceSpecs = ({ orderIntentsByPriceAgent, currentAgent, agents }) => {
  return pipe(
    map((priceSpec) => {
      const orderIntentsByAgent = orderIntentsByPriceAgent[priceSpec.id] || {}
      return h(ProductPriceSpec, {
        key: priceSpec.id,
        priceSpec: priceSpec,
        orderIntentsByAgent,
        currentAgent,
        agents
      })
    }),
    values
  )
}

const renderFacets = map((facet) => {
  return h(ProductFacet, {
    facet: facet,
    key: facet.id
  })
})

function SingleViewProduct (props) {
  const {
    styles,
    product,
    orderIntentsByPriceAgent,
    collectiveQuantityByPrice,
    currentAgent,
    agents,
    handleSubmit
  } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  const renderPriceSpecs = RenderPriceSpecs({ orderIntentsByPriceAgent, currentAgent, agents })

  return (
    h('form', {
      onSubmit: handleSubmit
    }, [
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
          className: styles.infoContainer
        }, [
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
            h(ProductPricePoints, {
              priceSpecs,
              collectiveQuantityByPrice
            })
          ]),
          h('div', {
            className: styles.facetsContainer
          }, [
            h(FormSection, {
              name: 'facets',
            }, [
              //renderFacets(facets)
            ])
          ]),
          h('div', {
            className: styles.priceSpecsContainer
          }, [
            h(FormSection, {
              name: 'priceSpecs'
            }, [
              renderPriceSpecs(priceSpecs)
            ])
          ]),
          h(RaisedButton, {
            type: 'submit',
            primary: true,
            className: styles.submitButton,
            label: (
              h(FormattedMessage, {
                id: 'ordering.add',
                className: styles.addButtonText
              })
            )
          })
        ])
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'singleViewProduct',
    enableReinitialize: true
  })
)(SingleViewProduct)
