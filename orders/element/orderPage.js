const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')

module.exports = {
  needs: {
    'inu.dispatch': 'first',
    'html.create': 'first',
    'consumerIntents.action.save': 'first',
    'orders.element': {
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const mapOrderItems = map(renderOrderItem)

    return renderOrder

    function renderOrderItem (orderItem) {
      const { supplierCommitment, allConsumerIntents, myConsumerIntent } = orderItem
      console.log('orderItem', orderItem)
      return api.html.create`
        <li>
          <h2>${supplierCommitment.name}</h2>
          <div>cost: ${api.orders.element.cost(supplierCommitment.costFunction)}</div>
          <div>batch size: ${api.orders.element.quantity(supplierCommitment.batchSize)}</div>
          <fieldset>
            <label>min</label>
            <input
              type='number'
              min='0'
              value=${myConsumerIntent.minValue}
              onchange=${handleConsumerIntentChange(myConsumerIntent, 'minValue')}
            />
          </fieldset>
          <fieldset>
            <label>max</label>
            <input
              type='number'
              min='0'
              value=${myConsumerIntent.maxValue}
              onchange=${handleConsumerIntentChange(myConsumerIntent, 'maxValue')}
            />
          </fieldset>
          <div>
            <div>totalMinValue: ${orderItem.totalMinValue}</div>
            <div>totalMaxValue: ${orderItem.totalMaxValue}</div>
            <div>totalBatches: ${orderItem.totalBatches}</div>
            <div>nextMin: ${orderItem.nextMin}</div>
            <div>nextExtra: ${orderItem.nextExtra}</div>
            <div>nextLeft: ${orderItem.nextLeft}</div>
          </div>
        </li>
      `
    }

    function handleConsumerIntentChange (previous, name) {
      return (ev) => {
        const next = assign(previous, {
          [name]: Number(ev.target.value)
        })
        const action = api.consumerIntents.action.save(next)
        api.inu.dispatch(action)
      }
    }

    function renderOrder (order) {
      const { id, orderItems } = order
      console.log('order', order)
      return api.html.create`
        <li>
          <a href=${`/orders/${id}`}>
            <h1>${id}</h1>
          </a>
          <ul>
            ${mapOrderItems(orderItems)}
          </ul>
        </li>
      `
    }
  }
}
