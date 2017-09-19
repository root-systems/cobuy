import { pipe, map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/SingleViewProduct'
import ProductPriceSpec from './ProductPriceSpec'

function SingleViewProduct (props) {
  const { styles, product, handleSubmit } = props

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
            src: product.image
          })
        ]),
        h('div', {
          className: styles.textContainer
        }, [
          h('h3', {
            className: styles.nameText
          }, product.name),
          h('p', {
            className: styles.productText
          }, product.description),
          h('p', {
            className: styles.priceText
          }, [
            h(FormattedMessage, {
              id: 'ordering.from',
              className: styles.fromText
            }),
            ` $${product.priceSpecifications[0].price}`
          ])
        ]),
        h('div', {
          className: styles.priceSpecsContainer
        }, map((priceSpec) => {
          return h(ProductPriceSpec, {
            priceSpec: priceSpec
          })
        }, product.priceSpecifications)),
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
  )
}

const ConnectedSingleViewProduct = reduxForm({ form: 'singleViewProduct' })(SingleViewProduct)

export default pipe(
  connectFela(styles)
)(ConnectedSingleViewProduct)
