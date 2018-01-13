import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela, createComponent } from 'react-fela'
import { map, pipe, prop, reduce, max, addIndex, sortBy, merge, length, reverse } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import BigMath from 'bigmath'

import styles from '../styles/ProductPricePoints'

export default compose(
  connectFela(styles)
)(ProductPricePoints)

const PriceBox = createComponent(styles.pricePoint)
const PriceMarker = createComponent(styles.priceMarker)

const ProgressBox = createComponent(styles.progressPoint)
const ProgressBar = createComponent(styles.progressBar)
const ProgressMarker = createComponent(styles.progressMarker)

function PricePoint (props) {
  const {
    styles,
    priceSpec,
    point,
    quantityAtPrice,
    isMet
  } = props


  return (
    h(PriceBox, {
      point,
      isMet
    }, [
      FormattedMessage({
        id: 'ordering.price',
        values: priceSpec,
        className: styles.pricePointPrice
      }),
      FormattedMessage({
        id: 'ordering.atMinimumOrMore',
        values: {
          minimum: priceSpec.minimum
        },
        className: styles.pricePointMinimum
      })
    ])
  )
}

function ProgressPoint (props) {
  const {
    styles,
    priceSpec,
    quantityAtPrice,
    progress,
    index,
    numPriceSpecs
  } = props

  return (
    h(ProgressBox, {
      progress,
      index,
      numPriceSpecs
    }, [
      FormattedMessage({
        id: 'ordering.quantityIntended',
        values: {
          quantity: quantityAtPrice
        },
        className: styles.progressPointQuantity
      }),
      FormattedMessage({
        id: 'ordering.atPrice',
        values: priceSpec,
        className: styles.progressPointPrice
      })
    ])
  )
}

function ProductPricePoints (props) {
  const {
    styles,
    priceSpecs,
    collectiveQuantityByPrice
  } = props

  // id
  // minimum
  // price
  // currency

  const maximumPriceSpecMinimum = getMaximumPriceSpecMinimum(priceSpecs)

  // TODO (mw) once we upgrade to latest React with fragment support,
  // we won't need to do this hack where we pass in component to run
  // this render twice at the same dom level
  const renderPrice = Component => map(priceSpec => {
    const quantityAtPrice = collectiveQuantityByPrice[priceSpec.id] || 0
    const point = priceSpec.minimum / maximumPriceSpecMinimum
    const needed = BigMath.sub(priceSpec.minimum, quantityAtPrice)
    const isMet = BigMath.lessThan(needed, '0')
    return h(Component, {
      styles,
      priceSpec,
      quantityAtPrice,
      point,
      needed,
      isMet
    })
  })

  const numPriceSpecs = length(priceSpecs)
  // TODO (mw) once we upgrade to latest React with fragment support,
  // we won't need to do this hack where we pass in component to run
  // this render twice at the same dom level
  const renderProgress = Component => pipe(
    map(priceSpec => {
      const quantityAtPrice = collectiveQuantityByPrice[priceSpec.id] || 0
      const progress = quantityAtPrice / maximumPriceSpecMinimum
      return merge(priceSpec, {
        quantityAtPrice,
        progress
      })
    }),
    sortBy(prop('progress')),
    reverse,
    mapIndexed((priceSpec, index) => {
      const { quantityAtPrice, progress } = priceSpec
      return (
        h(Component, {
          styles,
          priceSpec,
          quantityAtPrice,
          progress,
          index,
          numPriceSpecs
        })
      )
    })
  )

  console.log('priceSpecs', priceSpecs)

  return (
    h('div', {
      className: styles.container
    }, [
      renderPrice(PricePoint)(priceSpecs),
      renderPrice(PriceMarker)(priceSpecs),
      h('div', {
        className: styles.horizon
      }),
      renderProgress(ProgressBar)(priceSpecs),
      renderProgress(ProgressMarker)(priceSpecs),
      renderProgress(ProgressPoint)(priceSpecs)
    ])
  )
}

const mapIndexed = addIndex(map)

const getMaximumPriceSpecMinimum = pipe(
  map(prop('minimum')),
  reduce(max, 0)
)

