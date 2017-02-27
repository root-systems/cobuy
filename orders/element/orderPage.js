const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.create': 'first',
    'orders.element': {
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const mapSupplys = map(renderSupply)

    return renderOrder

    function renderSupply (supply) {
      return api.html.create`
        <li>
          <h2>${supply.name}</h2>
          <div>cost: ${api.orders.element.cost(supply.costFunction)}</div>
          <div>batch size: ${api.orders.element.quantity(supply.batchSize)}</div>
        </li>
      `
    }

    function renderOrder (order) {
      return api.html.create`
        <li>
          <a href=${`/orders/${order.id}`}>
            <h1>${order.id}</h1>
          </a>
          <section>
            supplies:
            <ul>
              ${mapSupplys(order.supplierCommitments)}
            </ul>
          </section>
        </li>
      `
    }
  }
}
