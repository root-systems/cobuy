import { compose } from 'recompose'
import { map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, FormSection } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/SingleViewProduct'
import ProductPriceSpec from './ProductPriceSpec'
import ProductFacet from './ProductFacet'

const renderPriceSpecs = map((priceSpec) => {
  return h(ProductPriceSpec, {
    priceSpec: priceSpec,
    key: priceSpec.id
  })
})

const renderFacets = map((facet) => {
  return h(ProductFacet, {
    facet: facet,
    key: facet.id
  })
})

function SingleViewProduct (props) {
  const { styles, product, handleSubmit } = props
  const { resourceType, priceSpecs, facets } = product
  const { name, description, image } = resourceType

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
            }, name),
            h('p', {
              className: styles.productText
            }, description),
            h('p', {
              className: styles.priceText
            }, [
              h(FormattedMessage, {
                id: 'ordering.fromPrice',
                className: styles.fromText,
                values: {
                  currency: priceSpecs[0].currency,
                  price: priceSpecs[0].price
                }
              })
            ])
          ]),
          h('div', {
            className: styles.facetsContainer
          }, [
            h(FormSection, {
              name: 'facets',
            }, [
              renderFacets(facets)
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
            label: h(FormattedMessage, {
              id: 'ordering.add',
              className: styles.addButtonText
            })
          })
        ])
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'singleViewProduct'
  })
)(SingleViewProduct)
