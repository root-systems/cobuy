import { compose } from 'recompose'
import { map, isNil, pipe, values, prop, reduce, max } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, FormSection } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/SingleViewProduct'
import ProductPricePoints from './ProductPricePoints'
import ProductIntentDialog from './ProductIntentDialog'

function SingleViewProduct (props) {
  const {
    styles,
    product,
    orderIntentsByPriceAgent,
    hasIntentByAgent,
    collectiveQuantityByPrice,
    currentAgent,
    agents,
    handleSubmit
  } = props
  if (isNil(product)) return null
  const { resourceType, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  return (
    h('div', {
      className: styles.container
    }, [
      h('header', {
        className: styles.header
      }, [
        h('img', {
          className: styles.image,
          src: image
        }),
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
            description
          ]),
        ])
      ]),
      h(ProductIntentDialog, {
        currentAgent,
        agents,
        product,
        orderIntentsByPriceAgent,
        hasIntentByAgent
      }),
      h(ProductPricePoints, {
        priceSpecs,
        collectiveQuantityByPrice
      })
    ])
  )
}

export default compose(
  connectFela(styles),
)(SingleViewProduct)
