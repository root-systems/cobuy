import { compose } from 'recompose'
import { merge, isNil, sortBy } from 'ramda'
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

function ListViewProduct (props) {
  const { styles, product, onNavigate } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType
  const sortedPriceSpecs = sortPriceSpecs(priceSpecs)
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
