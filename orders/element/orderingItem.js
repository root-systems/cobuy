const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const { combineRules } = require('fela')
const { StyleSheet } = require('fela-tools')

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
    }
  },
  create: (api) => {
    const { colors, fonts } = api.app.styles()

    const styleSheet = StyleSheet.create({
      container: combineRules(api.app.css.column, () => ({
        paddingBottom: '0.5rem',
        borderBottom: `1px solid ${colors.greyscale[3]}`
      })),
      header: combineRules(api.app.css.row, () => ({
        alignItems: 'center',
        height: '6rem'
      })),
      name: {
        flexGrow: '1'
      },
      separator: {
        height: '60%',
        borderLeft: `2px dotted ${colors.greyscale[3]}`
      },
      progress: api.app.css.row,
      next: combineRules(api.app.css.row, () => ({
        flexGrow: 1
      })),
      nextMin: props => ({
        color: 'white',
        // traffic light green
        backgroundColor: '#81C784',
        flexGrow: props.nextMin
      }),
      nextExtra: props => ({
        color: 'white',
        // traffic light yellow
        backgroundColor: '#FFB74D',
        flexGrow: props.nextExtra
      }),
      nextLeft: props => ({
        color: 'white',
        // traffic light red
        backgroundColor: '#E57373',
        flexGrow: props.nextLeft
      }),
      completed: {
        marginLeft: '1rem'
      }
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
        <li class=${styles.container}>
          <header class=${styles.header}>
            <h2 class=${styles.name}>${supplierCommitment.name}</h2>
            ${api.app.element.numberInput({
              label: 'min',
              min: 0,
              max: myConsumerIntent.maxValue,
              value: myConsumerIntent.minValue,
              onChange: handleConsumerIntentChange(myConsumerIntent, 'minValue')
            })}
            <div class=${styles.separator}></div>
            ${api.app.element.numberInput({
              label: 'max',
              min: myConsumerIntent.minValue,
              value: myConsumerIntent.maxValue,
              onChange: handleConsumerIntentChange(myConsumerIntent, 'maxValue')
            })}
          </header>
          <section class=${styles.progress}>
            <div class=${styles.next}>
              <div class=${styles.nextMin}>
                ${orderItem.nextMin}
              </div>
              <div class=${styles.nextExtra}>
                ${orderItem.nextExtra}
              </div>
              <div class=${styles.nextLeft}>
                ${orderItem.nextLeft}
              </div>
            </div>
            <div class=${styles.completed}>
              ${orderItem.totalBatches} total batches
            </div>
          </section>
        </li>
      `
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
