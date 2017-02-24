module.exports = {
  needs: {
    'agents.get.agents': 'first',
    'auth.get.whoami': 'first'
  },
  create: (api) => [
    api.agents.get.agents,
    api.auth.get.whoami,
    (agents, whoami) => agents[whoami]
  ]
}
