const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')

module.exports = {
  create: () => function orderingStatus ({ startDate, endDate }) {
    const now = new Date()
    if (isBefore(now, startDate)) {
      return 'pending'
    } else if (isAfter(now, startDate) && isBefore(now, endDate)) {
      return 'open'
    } else if (isAfter(now, endDate)) {
      return 'closed'
    }
  }
}

