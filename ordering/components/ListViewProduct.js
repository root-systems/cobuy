import { compose } from 'recompose'
import { merge, isNil, sortBy, map, values, pipe, prop, sum, indexBy, toPairs, fromPairs, tap, reduce, toString, mapObjIndexed, nth } from 'ramda'
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

const sortByPrice = sortBy(prop('price'))

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
  const sortedPriceSpecs = sortByPrice(priceSpecs)
  const quantitiesByPriceSpec = summedQuantitiesByPriceSpec(orderIntentsByPriceAgent)
  const priceSpecsIndexedById = indexById(priceSpecs)
  // TODO: IK: we want to get the relevant priceSpec for the highest quantity that matches the minimum of a priceSpec
  // TODO: IK: this is ugly af, and has bugs, the whole algorithm needs work to break it down with a good approach
  // TODO: IK: i.e. at the moment, selecting only a lower priceSpec on a product will break the calculations
  const deriveCorrectQuantityAndPriceSpec = pipe(
    toPairs,
    reduce((matchingPriceSpecAndQuantity, priceSpecAndQuantity) => {
      // console.log(matchingPriceSpecAndQuantity, priceSpecAndQuantity)
      // priceSpecAndQuantity is an array of ['priceSpecId', quantity]
      const iteratingPriceSpec = priceSpecsIndexedById[priceSpecAndQuantity[0]]
      if (matchingPriceSpecAndQuantity && iteratingPriceSpec.minimum < priceSpecsIndexedById[matchingPriceSpecAndQuantity[0]].minimum) {
        // if the iterated priceSpec minimum is less than the already matchingPriceSpecAndQuantity minimum, return early
        return matchingPriceSpecAndQuantity
      }
      if (priceSpecAndQuantity[1] > iteratingPriceSpec.minimum) {
        return priceSpecAndQuantity
      }
      return matchingPriceSpecAndQuantity
    }, null),
    (pairs) => {
      // if there was no matchingPriceSpecAndQuantity, we haven't reached the minimum of the highest priceSpec yet
      // just show the highest priceSpec
      if (isNil(pairs)) {
        const highestPriceSpecId = sortedPriceSpecs[0].id
        const currentCollectiveQuantity = quantitiesByPriceSpec[highestPriceSpecId] || 0
        return [toString(highestPriceSpecId), currentCollectiveQuantity]
      }
      return pairs
    },
    (pairs) => { return [pairs] },
    fromPairs,
    mapObjIndexed((v, k) => ({ quantity: v, priceSpecId: k })),
    values,
    nth(0)
  )
  const correctQuantityAndPriceSpec = deriveCorrectQuantityAndPriceSpec(quantitiesByPriceSpec)
  const correctQuantity = correctQuantityAndPriceSpec.quantity
  const correctPriceSpecId = correctQuantityAndPriceSpec.priceSpecId

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
              currency: priceSpecsIndexedById[correctPriceSpecId].currency,
              price: priceSpecsIndexedById[correctPriceSpecId].price
            }
          })
        ])
      ]),
      h(TableRowColumn, {}, [
        h('p', {
          className: styles.productText
        }, [
          correctQuantity
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
