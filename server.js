const services = [
  require('dogstack-agents/service'),
  require('./tasks/services/plans'),
  require('./tasks/services/works'),
  require('./ordering/services/orders'),
  require('./agents/services/agents')
]

export default {
  services
}
