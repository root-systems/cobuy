const distanceToNow = require('date-fns/distance_in_words_to_now')
const formatDate = require('date-fns/format')

module.exports = {
  needs: {
    'html.hx': 'first',
    'app.styles': 'first',
    'orders.helpers.orderStatus': 'first'
  },
  create: (api) => ({
    html: ({ startDate, endDate }) => {
      const orderStatus = api.orders.helpers.orderStatus({ startDate, endDate })
      const orderDateRange = `
        ${formatDate(startDate, 'DD.MM.YYYY')}
        -
        ${formatDate(endDate, 'DD.MM.YYYY')}
      `


      var orderDateDistance
      switch (orderStatus) {
        case 'pending':
          orderDateDistance = `starts in ${distanceToNow(startDate)}`
          break
        case 'open':
          orderDateDistance = `closes in ${distanceToNow(endDate)}`
          break
        case 'closed':
          orderDateDistance = `closed ${distanceToNow(endDate)} ago`
          break
      }
      return api.html.hx`
        <div>
          ${orderDateRange} (${orderDateDistance})
        </div>
      `
    },
    css: ({ startDate, endDate }) => {
      const { colors } = api.app.styles()
      const orderStatus = api.orders.helpers.orderStatus({ startDate, endDate })
      return {
        color: colors.greyscale[6]
      }
    }
  })
}
