module.exports = {
  needs: {
    app: {
      'css.column': 'first'
    },
    'nav.element': {
      header: 'first',
      body: 'first',
      footer: 'first'
    }
  },
  create: (api) => {
    const { Element, combineRules } = api.css
    const { column } = api.app.css
    const { header: Header, body: Body, footer: Footer } = api.nav.element

    const drawerStyle = combineRules(column, ({ theme }) => ({
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: theme.colors.greyscale[2],
    }))

    const Drawer = Element('nav', drawerStyle)

    return ({ header, body, footer }) => Drawer([
      Header(header),
      Body(body),
      Footer(footer)
    ])
  }
}
