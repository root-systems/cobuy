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

const Point = createComponent(styles.point)
const PointMarker = createComponent(styles.pointMarker)
const ProgressBar = createComponent(styles.progressBar)
const ProgressMarker = createComponent(styles.progressMarker)

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

  const renderPriceSpecPoints = map(priceSpec => {
    const point = priceSpec.minimum / maximumPriceSpecMinimum
    const quantityAtPrice = collectiveQuantityByPrice[priceSpec.id] || 0
    const needed = BigMath.sub(quantityAtPrice, priceSpec.minimum)

    return (
      h(Point, {
        point
      }, [
        FormattedMessage({
          id: 'ordering.price',
          values: priceSpec,
          className: styles.price
        }),
        BigMath.lessThan(needed, '0')
          ? FormattedMessage({
              id: 'ordering.quantityToMeetPrice',
              values: {
                quantity: BigMath.abs(needed)
              },
              className: styles.quantityToMeetPrice
            })
          : FormattedMessage({
              id: 'ordering.quantityAtPrice',
              values: {
                quantity: quantityAtPrice
              },
              className: styles.quantityAtPrice
            })
      ])
    )
  })

  const renderPriceSpecPointMarkers = map(priceSpec => {
    const point = priceSpec.minimum / maximumPriceSpecMinimum
    return (
      h(PointMarker, {
        point
      })
    )
  })

  const numPriceSpecs = length(priceSpecs)
  // TODO (mw) once we upgrade to latest React with fragment support,
  // we won't need to do this hack where we pass in component to run
  // this render twice at the same dom level
  const renderPriceSpecProgress = Component => pipe(
    map(priceSpec => {
      const collectiveQuantity = collectiveQuantityByPrice[priceSpec.id] || 0
      const progress = collectiveQuantity / maximumPriceSpecMinimum
      return merge(priceSpec, {
        progress
      })
    }),
    sortBy(prop('progress')),
    reverse,
    mapIndexed((priceSpec, index) => {
      const { progress } = priceSpec
      return (
        h(Component, {
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
      renderPriceSpecPoints(priceSpecs),
      renderPriceSpecPointMarkers(priceSpecs),
      h('div', {
        className: styles.horizon
      }),
      renderPriceSpecProgress(ProgressBar)(priceSpecs),
      renderPriceSpecProgress(ProgressMarker)(priceSpecs)
    ])
  )
}

const mapIndexed = addIndex(map)

const getMaximumPriceSpecMinimum = pipe(
  map(prop('minimum')),
  reduce(max, 0)
)

