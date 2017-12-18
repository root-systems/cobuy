import { pipe, prop, omit, assoc, __ } from 'ramda'

const resetParamsWithoutOrder = pipe(
  prop('query'),
  omit(['orderId']),
  assoc('query', __, {})
)

function queryByOrder (hook) {
  const { orderId } = hook.params.query
  
  if (orderId) {
    hook.params = resetParamsWithoutOrder(hook.params)

    const query = this.createQuery({ query: hook.params.query })

    if (orderId.$in) {
      const raw = this.knex.raw.bind(this.knex)
      const orderIds = orderId.$in
      query.where(function () {
        orderIds.forEach(orderId => {
          return this.orWhere(raw("params->>'orderId'"), '=', orderId)
        })
      })
    } else {
      query.where(this.knex.raw("params->>'orderId'"), '=', orderId)
    }

    hook.params.knex = query
  }
  
  return hook
}

export default queryByOrder
