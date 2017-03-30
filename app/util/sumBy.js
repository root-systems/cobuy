const flow = require('lodash/fp/flow')
const map = require('lodash/fp/map')
const reduce = require('lodash/fp/reduce')
const BigMath = require('bigmath')

module.exports = {
  create: () => function sumBy (name) {
    return flow(
      map(name),
      reduce(BigMath.add, '0')
    )
  }
}

