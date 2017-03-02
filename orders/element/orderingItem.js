const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const assignAll = require('lodash/fp/assignAll')
const StyleSheet = require('stilr')

const row = {
  display: 'flex',
  flexDirection: 'row'
}
const col = {
  display: 'flex',
  flexDirection: 'column'
}
const field = {
  border: 'none',
  padding: '0rem'
}
const screenReaderOnly = {
  clip: 'rect(1px, 1px, 1px, 1px)',
  position: 'absolute',
  height: '1px',
  width: '1px',
  overflow: 'hidden'
}
const bar = {
}

module.exports = {
  needs: {
    'inu.dispatch': 'first',
    'html.create': 'first',
    app: {
      styles: 'first',
      'element.numberInput': 'first'
    },
    'consumerIntents.action.save': 'first',
    'orders.element': {
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const { colors, fonts, elements, mixins } = api.app.styles()
    const styles = StyleSheet.create({
      container: assignAll([mixins.column]),
      header: assignAll([mixins.row, {
        alignItems: 'center'
      }]),
      name: {
        flexGrow: '1'
      },
      minField: assignAll([elements.fieldset]),
      minLabel: mixins.screenReaderOnly,
      minInput: {

      },
      maxField: assignAll([elements.fieldset]),
      maxLabel: mixins.screenReaderOnly,
      maxInput: {

      },
      progress: assignAll([mixins.row]),
      next: assignAll([mixins.row, {
        flexGrow: '1'
      }]),
      nextMin: {
        backgroundColor: 'blue'
      },
      nextExtra: {
        backgroundColor: 'green'
      },
      nextLeft: {
        backgroundColor: 'red'
      },
      completed: {
        
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
      return api.html.create`
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
            ${api.app.element.numberInput({
              label: 'max',
              min: myConsumerIntent.minValue,
              value: myConsumerIntent.maxValue,
              onChange: handleConsumerIntentChange(myConsumerIntent, 'maxValue')
            })}
          </header>
          <section class=${styles.progress}>
            <div class=${styles.next}>
              <div
                class=${styles.nextMin}
                style='flex-grow: ${orderItem.nextMin}'
              >${orderItem.nextMin}</div>
              <div
                class=${styles.nextExtra}
                style='flex-grow: ${orderItem.nextExtra}'
              >${orderItem.nextExtra}</div>
              <div
                class=${styles.nextLeft}
                style='flex-grow: ${orderItem.nextLeft}'
              >${orderItem.nextLeft}</div>
            </div>
            <div class=${styles.completed}>${orderItem.totalBatches}</div>
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
