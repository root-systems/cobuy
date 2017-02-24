module.exports = {
  needs: {
    'auth.get.auth': 'first'
  },
  create: (api) => [
    api.auth.get.auth,
    (auth) => auth.whoami
  ]
}
