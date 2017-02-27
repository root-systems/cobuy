const formatDate = require('date-fns/format')

module.exports = {
  needs: {
    'html.create': 'first'
  },
  create: (api) => (order) => api.html.create`
    <a href='/orders/${order.id}'>
      <div>
        <h2>${order.name}</h2>
        <p>
          Order date:
          ${formatDate(order.date, 'DD.MM.YYYY')}
        </p>
      </div>
    </a>
  `
}
