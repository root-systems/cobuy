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
      header: combineRules(api.app.css.row, (props) => ({
        alignItems: 'baseline',
        backgroundColor: props.orderItem.shouldMeetMinBatches
          ? redLight : props.orderItem.shouldFillExtraBatch
          ? yellowLight : greenLight
      })),
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
        backgroundColor: redLight
      },
      myMin: {},
      myMax: {},
      groupMin: {},
      groupMax: {},
      totalBatches: {},
      callToFillExtra: {
        backgroundColor: yellowLight
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
              ${orderItem.expectedMyValue}
              ${orderItem.batchSize.unit}
              for
              ${BigMath.toFormat(orderItem.expectedMyCost, 2)}
              ${orderItem.currency}
            </div>
          </header>
          ${orderItem.isExpanded ? api.html.hx`
            <ul class=${styles.detailed}>
              ${orderItem.didMeetMinimumBatches ? null : api.html.hx`
                <li class=${styles.callToMeetMin}>
                  The group needs to buy at least
                  ${orderItem.minimumBatches}
                  batches of
                  ${orderItem.batchSize.value}
                  ${orderItem.batchSize.unit} per batch.
                </li>
              `}
              <li class=${styles.myMin}>
                I want to
                ${api.app.element.numberInput({
                  label: 'desired',
                  min: myConsumerIntent.minimumValue,
                  max: myConsumerIntent.maximumValue,
                  value: myConsumerIntent.desiredValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'desiredValue')
                })}
                ${orderItem.desiredValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.myMax}>
                I am prepared to receive between
                ${api.app.element.numberInput({
                  label: 'minimum',
                  min: 0,
                  max: myConsumerIntent.maximumValue,
                  value: myConsumerIntent.minimumValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'minimumValue')
                })}
                and
                ${api.app.element.numberInput({
                  label: 'maximum',
                  min: myConsumerIntent.minimumValue,
                  value: myConsumerIntent.maximumValue,
                  onChange: handleConsumerIntentChange(myConsumerIntent, 'maximumValue')
                })}
                ${orderItem.maximumValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.groupMin}>
                The group wants ${orderItem.totals.desiredValue}
                ${orderItem.totals.desiredValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.groupMax}>
                The group is prepared to receive between
                ${orderItem.totals.minimumValue}
                and
                ${orderItem.totals.maximumValue}
                ${orderItem.totals.maximumValue === 1 ? orderItem.name : orderItem.pluralName}.
              </li>
              <li class=${styles.totalBatches}>
                The group wants enough for ${orderItem.totals.desiredBatchs}
                batches of ${orderItem.batchSize.value} ${orderItem.batchSize.unit} per batch.
              </li>
              ${orderItem.didMeetIntentRanges ? api.html.hx`
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
        var next = assign(previous, {
          [name]: value
        })
        if (name === 'maximumValue' && BigMath.greaterThan(previous.desiredValue, value)) {
          next.desiredValue = value
        } else if (name === 'minimumValue' && BigMath.lessThan(previous.desiredValue, value)) {
          next.desiredValue = value
        }
        const action = api.consumerIntents.action.save(next)
        api.inu.dispatch(action)
      }
    }
  }
}
