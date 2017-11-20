import { compose } from 'recompose'
import { merge, isNil, sortBy, map, values, pipe, prop, sum, indexBy } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ListViewProduct'

const sortPriceSpecs = sortBy((priceSpec) => {
  return priceSpec.price
})

const indexById = indexBy(prop('id'))

const summedQuantitiesByPriceSpec = map(pipe(
  values,
  map(prop('desiredQuantity')),
  sum
))

function ListViewProduct (props) {
  const { styles, product, orderIntentsByPriceAgent, onNavigate } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType
  const sortedPriceSpecs = sortPriceSpecs(priceSpecs)
  const quantitiesByPriceSpec = summedQuantitiesByPriceSpec(orderIntentsByPriceAgent)
  const priceSpecsIndexedById = indexById(priceSpecs)
  console.log(quantitiesByPriceSpec)
  console.log(priceSpecsIndexedById)
  // TODO: IK: we want to get the relevant priceSpec for the highest quantity that matches the minimum of a priceSpec
  // either a sorting technique, or iterate over all and record which is highest (reduce?)
  return (
    h(TableRow, {}, [
      h(TableRowColumn, { style: { width: '50px' } }, [
        h('img', {
          className: styles.image,
          src: image
        })
      ]),
      h(TableRowColumn, {}, [
        h('h3', {
          className: styles.nameText
        }, [
          name
        ]),
      ]),
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          description
        ]),
      ]),
      h(TableRowColumn, { style: { width: '100px' } }, [
        h('p', {
          className: styles.priceText
        }, [
          h(FormattedMessage, {
            id: 'ordering.fromPrice',
            className: styles.fromText,
            values: {
              currency: sortedPriceSpecs[0].currency,
              price: sortedPriceSpecs[0].price
            }
          })
        ])
      ]),
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          description
        ]),
      ]),
      h(TableRowColumn, {}, [
        h(FlatButton, {
          onClick: (ev) => {
            onNavigate(product)
          }
        },
        ['click here'])
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ListViewProduct)

// h('div', {
//   className: styles.container
// }, [
//   h('div', {
//     className: styles.imageContainer
//   }, [
//     h('img', {
//       className: styles.image,
//       src: image
//     })
//   ]),
//   h('div', {
//     className: styles.textContainer
//   }, [
//     h('h3', {
//       className: styles.nameText
//     }, [
//       name
//     ]),
//     h('p', {
//       className: styles.productText
//     }, [
//       description
//     ]),
//     h('p', {
//       className: styles.priceText
//     }, [
//       h(FormattedMessage, {
//         id: 'ordering.fromPrice',
//         className: styles.fromText,
//         values: {
//           currency: sortedPriceSpecs[0].currency,
//           price: sortedPriceSpecs[0].price
//         }
//       })
//     ])
//   ]),
//   h(FlatButton, {
//     onClick: (ev) => {
//       onNavigate(product)
//     }
//   },
//   ['click here'])
// ])
