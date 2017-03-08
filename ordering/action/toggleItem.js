const assign = require('lodash/fp/assign')

module.exports = {
  create: () => ({
    update: (model, action) => {
      const { orderItemId, isExpanded: setExpanded } = action
      const { items } = model
      const orderItem = items[orderItemId] || {}
      const { isExpanded = false } = orderItem

      const nextIsExpanded = setExpanded === undefined ? !isExpanded : setExpanded
      const nextOrderItem = assign(orderItem, { isExpanded: nextIsExpanded })
      const nextItems = assign(items, { [orderItemId]: nextOrderItem })
      const nextModel = assign(model, { items: nextItems })
      return { model: nextModel }
    }
  })
}
