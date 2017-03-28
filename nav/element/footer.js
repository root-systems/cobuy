module.exports = {
  needs: {
    'nav.element': {
      list: 'first',
      item: 'first'
    }
  },
  create: (api) => {
    const { Element } = api.css
    const { list: List, item: Item } = api.nav.element

    const footerStyle = () => ({})
    const Footer = Element('div', footerStyle)

    return ({ items }) => Footer([
      List([
        items.map(Item)
      ])
    ])
  }
}
