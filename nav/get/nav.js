module.exports = {
  needs: {
    'nav.get.isExpanded': 'first'
  },
  create: (api) => ({
    isExpanded: api.nav.get.isExpanded
  })
}
