const distanceToNow = require('date-fns/distance_in_words_to_now')
const formatDate = require('date-fns/format')

module.exports = {
  needs: {
    'orders.helpers.orderStatus': 'first'
  },
  create: (api) => {
    const { Element } = api.css

    const orderDateStyle = ({ theme }) => ({
      color: theme.colors.greyscale[6]
    })
    const OrderDate = Element('div', orderDateStyle)

    return ({ startDate, endDate }) => {
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

      return OrderDate([
        orderDateRange,
        ' (',
        orderDateDistance,
        ')'
      ])
    }
  }
}
