const { keys } = Object
const assign = require('object-assign')

const data = {}

module.exports = {
  needs: {
    'pull.values': 'first'
  },
  manifest: {
    all: 'source',
    get: 'async'
  },
  create: (api) => ({
    methods: {
      all: function () {
        const orders = keys(data)
          .map(id => assign({ id }, data[id]))
        return api.pull.values(orders)
      },
      get: function ({ id }, cb) {
        cb(null, assign({ id }, data[id]))
      }
    }
  })
}
