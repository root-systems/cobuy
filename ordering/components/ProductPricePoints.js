import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela, createComponent } from 'react-fela'
import { map, pipe, prop, reduce, max } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import BigMath from 'bigmath'

import styles from '../styles/ProductPricePoints'

export default compose(
  connectFela(styles)
)(ProductPricePoints)

const Point = createComponent(styles.point)
const Progress = createComponent(styles.progress)

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

  const renderPriceSpecProgress = map(priceSpec => {
    const collectiveQuantity = collectiveQuantityByPrice[priceSpec.id] || 0
    const progress = collectiveQuantity / maximumPriceSpecMinimum
    return (
      h(Progress, {
        progress
      })
    )
  })

  console.log('priceSpecs', priceSpecs)

  return (
    h('div', {
      className: styles.newPriceSpecsContainer
    }, [
      renderPriceSpecPoints(priceSpecs),
      renderPriceSpecProgress(priceSpecs)
    ])
  )
}

const getMaximumPriceSpecMinimum = pipe(
  map(prop('minimum')),
  reduce(max, 0)
)

