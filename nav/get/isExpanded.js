module.exports = {
  needs: ['nav.get.rawNav', 'first'],
  create: (api) => [
    api.nav.get.rawNav,
    (nav) => nav.isExpanded
  ]
}
