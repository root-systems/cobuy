import { compose } from 'recompose'
import { isNil } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import { Link } from 'react-router-dom'
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

function ListViewProduct (props) {
  const { styles, product, onNavigate, applicablePriceSpec, collectiveQuantity } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  return (
    h(TableRow, { className: styles.tableRow, onClick: (ev) => {
      onNavigate(product)
    } }, [
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
              currency: applicablePriceSpec.currency,
              price: applicablePriceSpec.price
            }
          })
        ])
      ]),
      h(TableRowColumn, { style: { width: '200px' } }, [
        h('p', {
          className: styles.productText
        }, [
          collectiveQuantity
        ]),
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ListViewProduct)
