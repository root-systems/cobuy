import { compose } from 'recompose'
import { isNil, pipe, path, defaultTo } from 'ramda'
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
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/ListViewProduct'

const getQuantityForAgent = ({ currentAgent, orderIntentsByAgentPrice, applicablePriceSpec }) => {
  return pipe(
    path([currentAgent.id, applicablePriceSpec.id, 'desiredQuantity']),
    defaultTo('0')
  )(orderIntentsByAgentPrice)
}

function ListViewProduct (props) {
  const {
    styles,
    product,
    onNavigate,
    currentAgent,
    applicablePriceSpec,
    collectiveQuantity,
    orderIntentsByAgentPrice
  } = props
  if (isNil(product)) return null
  const { resourceType, facets, priceSpecs } = product
  if (isNil(priceSpecs)) return null
  if (isNil(resourceType)) return null
  const { name, description, image } = resourceType

  const yourQuantity = getQuantityForAgent({ currentAgent, orderIntentsByAgentPrice, applicablePriceSpec })

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
        ])
      ]),
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          description
        ])
      ]),
      h(TableRowColumn, {}, [
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
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          collectiveQuantity
        ])
      ]),
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          yourQuantity
        ])
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ListViewProduct)
