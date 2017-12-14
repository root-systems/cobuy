exports.seed = function (knex, Promise) {
  return
  const order = {
    consumerAgentId: 2,
    supplierAgentId: 3,
    adminAgentId: 8
  }

  return knex('orders').insert(order).returning('id')
    .then(([orderId]) => {
      console.log(orderId)
      const orderIntents = [{
        agentId: 8,
        desiredQuantity: 11,
        productId: 1,
        priceSpecId: 1,
        orderId
      },
      {
        agentId: 7,
        desiredQuantity: 12,
        productId: 1,
        priceSpecId: 2,
        orderId
      },
      {
        agentId: 6,
        desiredQuantity: 84,
        productId: 1,
        priceSpecId: 2,
        orderId
      },
      {
        agentId: 6,
        desiredQuantity: 64,
        productId: 1,
        priceSpecId: 1,
        orderId
      }]

      return Promise.all(orderIntents.map((intent) => knex('orderIntents').insert(intent)))
      .then(() => {
        return knex('taskPlans').insert({
          taskRecipeId: 'closeOrder',
          params: JSON.stringify({
            orderId: 1
          }),
          assigneeId: 8
        })
      })
    })
}
