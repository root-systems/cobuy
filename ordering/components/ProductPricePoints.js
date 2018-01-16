import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela, createComponent } from 'react-fela'
import { map, pipe, prop, reduce, max, addIndex, sortBy, merge, length, reverse } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import BigMath from 'bigmath'

import styles, * as cStyles from '../styles/ProductPricePoints'

// we're using both react-fela.connect and react-fela.createComponent.
// we use createComponent when we need to pass in specific information for that component, rather than the whole container.

export default compose(
  connectFela(styles)
)(ProductPricePoints)

const PriceBox = createComponent(cStyles.pricePoint)
const PriceMarker = createComponent(cStyles.priceMarker)

const ProgressBox = createComponent(cStyles.progressPoint)
const ProgressBar = createComponent(cStyles.progressBar)
const ProgressMarker = createComponent(cStyles.progressMarker)

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
    isMet,
    hasMet,
    index,
    numPoints
  } = props

  return (
    h(ProgressBox, {
      progress,
      isMet,
      hasMet,
      index,
      numPoints
    }, [
      h(FormattedMessage, {
        id: 'ordering.groupQuantity',
        values: {
          quantity: quantityAtPrice
        },
        className: styles.progressPointQuantity
      }),
      h(FormattedMessage, {
        id: 'ordering.atPrice',
        values: priceSpec,
        className: styles.progressPointPrice
      })
    ])
  )
}

function ProductPricePoints (props) {
  // this is not defensive against bad price specs.
  // TODO (mw) ensure bad price specs never come here.

  const {
    styles,
    priceSpecs,
    collectiveQuantityByPrice
  } = props

  const maximumPriceSpecMinimum = getMaximumPriceSpecMinimum(priceSpecs)

  // TODO (mw) once we upgrade to latest React with fragment support,
  // we won't need to do this hack where we pass in component to run
  // this render twice at the same dom level
  const renderPrice = Component => map(priceSpec => {
    const quantityAtPrice = collectiveQuantityByPrice[priceSpec.id] || 0
    const point = BigMath.div(priceSpec.minimum, maximumPriceSpecMinimum)
    const needed = BigMath.sub(priceSpec.minimum, quantityAtPrice)
    const isMet = BigMath.lessThanOrEqualTo(needed, '0')
    return h(Component, {
      styles,
      priceSpec,
      quantityAtPrice,
      point,
      isMet
    })
  })

  // TODO (mw) once we upgrade to latest React with fragment support,
  // we won't need to do this hack where we pass in component to run
  // this render twice at the same dom level
  const renderProgress = Component => pipe(
    map(priceSpec => {
      const quantityAtPrice = collectiveQuantityByPrice[priceSpec.id] || 0
      const progress = BigMath.div(quantityAtPrice, maximumPriceSpecMinimum)
      const needed = BigMath.sub(priceSpec.minimum, quantityAtPrice)
      const isMet = BigMath.lessThanOrEqualTo(needed, '0')
      return merge(priceSpec, {
        quantityAtPrice,
        progress,
        isMet
      })
    }),
    sortBy(prop('progress')),
    reverse,
    // filter out any progress below highest met point
    reduce((sofar, next) => {
      if (sofar.isMet) return sofar
      return {
        items: [...sofar.items, next],
        isMet: next.isMet
      }
    }, { items: [], isMet: false }),
    ({ items, isMet }) => items.map(merge({
      hasMet: isMet,
      numPoints: length(items)
    })),
    reverse, // so indexes are ordered in specific way
    mapIndexed((priceSpec, index) => {
      const { quantityAtPrice, progress, isMet, hasMet, numPoints } = priceSpec
      return (
        h(Component, {
          styles,
          priceSpec,
          quantityAtPrice,
          progress,
          isMet,
          hasMet,
          index,
          numPoints
        })
      )
    })
  )

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
  reduce(BigMath.max, 0)
)

