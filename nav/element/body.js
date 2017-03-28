module.exports = {
  needs: {
    'nav.element': {
      list: 'first',
      item: 'first'
    }
  },
  create: (api) => {
    const { list: List, item: Item } = api.nav.element

    const bodyStyles = (props) => ({
      flexGrow: 1
    })
    const Body = api.css.Element('div', bodyStyles)

    return ({ items }) => Body([
      List([
        items.map(Item)
      ])
    ])
  }
}
