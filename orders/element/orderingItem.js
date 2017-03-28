const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const BigMath = require('bigmath')

module.exports = {
  needs: {
    'inu.dispatch': 'first',
    'html.hx': 'first',
    'app': {
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
    const { connect, combineRules } = api.css

    // traffic light green
    const greenLight = '#81C784'
    // traffic light yellow
    const yellowLight = '#FFB74D'
    // traffic light red
    const redLight = '#E57373'

    const Styles = props => renderRule => ({
      container: combineRules(api.app.css.column, ({ theme }) => ({
        borderBottom: `1px solid ${theme.colors.greyscale[3]}`
      })),
      header: combineRules(api.app.css.row, (props) => {
        return {
          alignItems: 'baseline',
          backgroundColor: props.shouldMeetMinBatches
            ? redLight : props.shouldFillExtraBatch
            ? yellowLight : greenLight
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
      callToMeetMin: {
        backGroundColor: redLight
      },
      myMin: {},
      myMax: {},
      groupMin: {},
      groupMax: {},
      totalBatches: {},
      callToFillExtra: {
        backGroundColor: yellowLight
      }
    })

    return connect(Styles, renderOrderingItem)

    function renderOrderingItem ({ styles, orderItem }) {
      const { supplierCommitment, allConsumerIntents, myConsumerIntent } = orderItem

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
              ${BigMath.toFormat(orderItem.expectedCost, 2)}
              ${orderItem.currency}
            </div>
          </header>
          ${orderItem.isExpanded ? api.html.hx`
            <ul class=${styles.detailed}>
              ${orderItem.shouldMeetMinBatches ? null : api.html.hx`
                <li class=${styles.callToMeetMin}>
                  The group needs to buy at least ${orderItem.minBatches} batches of ${orderItem.batchSize.value} ${orderItem.batchSize.unit}.
                </li>
              `}
              <li class=${styles.myMin}>
                I need at least
                ${api.app.element.numberInput({
                  label: 'min',
                  min: 0,
                  max: myConsumerIntent.maxValue,
                  value: myConsumerIntent.minValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'minValue')
                })}
                ${orderItem.minValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.myMax}>
                I am prepared to receive up to
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
                ${orderItem.totalMinValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.groupMax}>
                The group is prepared to receive up to ${orderItem.totalMaxValue}
                ${orderItem.totalMaxValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.totalBatches}>
                The group wants enough for ${orderItem.totalBatches}
                batches of ${orderItem.batchSize.value} ${orderItem.batchSize.unit}.
              </li>
              ${orderItem.shouldFixExtraBatch ? api.html.hx`
                <li class=${styles.callToFillExtra}>
                  If the group increases the max by ${orderItem.nextLeft}
                  ${orderItem.nextLeft === 1 ? orderItem.name : orderItem.pluralName}
                  then everyone will get their min.
                </li>
              ` : null}
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
