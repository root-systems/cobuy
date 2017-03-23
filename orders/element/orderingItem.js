const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const { combineRules } = require('fela')
const { StyleSheet } = require('fela-tools')
const BigMath = require('bigmath')

module.exports = {
  needs: {
    css: {
      renderRule: 'first'
      // combineRules: 'first'
    },
    'inu.dispatch': 'first',
    'html.hx': 'first',
    'css.renderRule': 'first',
    app: {
      styles: 'first',
      css: {
        row: 'first',
        column: 'first',
        fieldset: 'first',
        ul: 'first',
        screenReaderOnly: 'first'
      },
      'element.numberInput': 'first'
    },
    'consumerIntents.action.save': 'first',
    'orders.element': {
      cost: 'first',
      quantity: 'first'
    },
    'ordering.action.toggleItem': 'first'
  },
  create: (api) => {
    const { colors, fonts } = api.app.styles()

    const styleSheet = StyleSheet.create({
      container: combineRules(api.app.css.column, () => ({
        borderBottom: `1px solid ${colors.greyscale[3]}`
      })),
      header: combineRules(api.app.css.row, () => {
        // traffic light green
        //backgroundColor: '#81C784',
        // traffic light yellow
        //backgroundColor: '#FFB74D',
        // traffic light red
        //backgroundColor: '#E57373',
        return {
          alignItems: 'baseline'
        }
      }),
      name: {
      },
      summary: {
        fontSize: '1.4rem',
        textAlign: 'center',
        flexGrow: '1'
      },
      detailed: {
        fontSize: '1.2rem',
        paddingBottom: '0.5rem'
      },
      myMin: {},
      myMax: {},
      groupMin: {},
      groupMax: {},
      totalBatches: {},
      callToFillExtra: {}
    })

    return renderOrderingItem

    function renderOrderingItem (orderItem) {
      const { supplierCommitment, allConsumerIntents, myConsumerIntent } = orderItem
      console.log('orderItem', orderItem)
      /*
       TODO how to display:
        <div>cost: ${api.orders.element.cost(supplierCommitment.costFunction)}</div>
        <div>batch size: ${api.orders.element.quantity(supplierCommitment.batchSize)}</div>
      */

      const renderStyles = mapValues(rule => {
        return api.css.renderRule(rule, orderItem)
      })

      const styles = renderStyles(styleSheet)

      return api.html.hx`
        <li
          class=${styles.container}
          events=${{
            click: handleExtendClick
          }}
        >
          <header class=${styles.header}>
            <h2 class=${styles.name}>${supplierCommitment.name}</h2>
            <div class=${styles.summary}>
              I will receive
              ${orderItem.expectedValue}
              ${orderItem.batchSize.unit}
              for
              ${orderItem.expectedCost}
              ${orderItem.currency}
            </div>
          </header>
          ${orderItem.isExpanded ? api.html.hx`
            <ul class=${styles.detailed}>
              <li class=${styles.myMin}>
                I need at least
                ${api.app.element.numberInput({
                  label: 'min',
                  min: 0,
                  max: myConsumerIntent.maxValue,
                  value: myConsumerIntent.minValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'minValue')
                })}
                ${orderItem.minValue === 1 ? orderItem.name : orderItem.pluralName}
              </li>
              <li class=${styles.myMax}>
                and I am prepared to receive up to
                ${api.app.element.numberInput({
                  label: 'max',
                  min: myConsumerIntent.minValue,
                  value: myConsumerIntent.maxValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'maxValue')
                })}
                ${orderItem.maxValues === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.groupMin}>
                The group wants at least ${orderItem.totalMinValue}
                ${orderItem.totalMinValue === 1 ? orderItem.name : orderItem.pluralName}
              </li>
              <li class=${styles.groupMax}>
                and is prepared to reecive up to ${orderItem.totalMaxValue}
                ${orderItem.totalMaxValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.totalBatches}>
                The group wants enough for ${orderItem.totalBatches}
                batches of ${orderItem.batchSize.value} ${orderItem.batchSize.unit}.
              </li>
              ${(orderItem.didFillExtra || BigMath.equals(orderItem.nextMin, '0')) ? null : api.html.hx`
                <li class=${styles.callToFillExtra}>
                  If the group increases the max by ${orderItem.nextLeft}
                  ${orderItem.nextLeft === 1 ? orderItem.name : orderItem.pluralName}
                  then everyone will get their min.
                </li>
              `}
            </ul>
          ` : null}
        </li>
      `

      function handleExtendClick (ev) {
        const action = api.ordering.action.toggleItem({
          orderItemId: orderItem.id
        })
        api.inu.dispatch(action)
      }
    }

    function handleConsumerIntentChange (previous, name) {
      return (value) => {
        const next = assign(previous, {
          [name]: value
        })
        const action = api.consumerIntents.action.save(next)
        api.inu.dispatch(action)
      }
    }
  }
}
