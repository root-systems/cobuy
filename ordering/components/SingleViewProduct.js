import { compose } from 'recompose'
import { map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm } from 'redux-form'
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
          className: styles.infoContainer
        }, [
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
                id: 'ordering.fromPrice',
                className: styles.fromText,
                values: {
                  currency: product.priceSpecs[0].currency,
                  price: product.priceSpecs[0].price
                }
              })
            ])
          ]),
          h('div', {
            className: styles.priceSpecsContainer
          }, map((priceSpec) => {
            return h(ProductPriceSpec, {
              priceSpec: priceSpec
            })
          }, product.priceSpecs)),
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
