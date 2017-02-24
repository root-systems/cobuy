const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.create': 'first',
    'inu.dispatch': 'first',
    'app.layout': 'first',
    orders: {
      'action.loadAll': 'first',
      'get.allProps': 'first'
    }
  },
  create: (api) => {

    function renderQuantity (qty) {
      return api.html.create`
        <span>
          ${qty.value}
          ${qty.unit}
        </span>
      `
    }

    function renderCostStep (costStep) {
      return api.html.create`
        <li>
          \$
          ${costStep.pricePerBatch}
          ${'@ >'}
          ${costStep.minBatches} batches
        </li>
      `
    }

    const mapCostSteps = map(renderCostStep)

    function renderCost (cost) {
      return api.html.create`
        <ul>
          ${mapCostSteps(cost)}
        </ul>
      `
    }

    function renderSupply (supply) {
      return api.html.create`
        <li>
          <h2>${supply.name}</h2>
          <div>cost: ${renderCost(supply.costFunction)}</div>
          <div>batch size: ${renderQuantity(supply.batchSize)}</div>
        </li>
      `
    }

    const mapSupplys = map(renderSupply)

    const mapOrders = map(order => api.html.create`
      <li>
        <a href=${`/order/${order.id}`}>
          <h1>${order.id}</h1>
        </a>
        <section>
          supplies:
          <ul>
            ${mapSupplys(order.supplys)}
          </ul>
        </section>
      </li>
    `)

    function renderOrders (orders) {
      return api.html.create`
        <ul onload=${handleLoad}>
          ${mapOrders(orders)}
        </ul>
      `
    }

    function handleLoad (el) {
      api.inu.dispatch(api.orders.action.loadAll())
    }

    return {
      route: '/orders',
      layout: api.app.layout,
      get: api.orders.get.allProps,
      view: (props, dispatch) => {
        return renderOrders(props.orders)
      }
    }
  }
}
