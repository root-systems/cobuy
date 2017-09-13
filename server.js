const services = [
  require('dogstack-agents/service'),
  require('./tasks/services/plans'),
  require('./tasks/services/works'),
  require('./ordering/services/orders'),
  require('./agents/services/agents'),
  require('./notifications/services/mailer'),
  require('./supply/services/products'),
  require('./supply/services/priceSpecs'),
  require('./resources/services/resourceTypes')
]

export default {
  services
}
