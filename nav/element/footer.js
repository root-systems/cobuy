module.exports = {
  needs: {
    'html.hx': 'first',
    'nav.element': {
      list: 'first',
      item: 'first'
    }
  },
  create: (api) => ({
    html: (props) => {
      const { items } = props
      const { list: List, item: Item } = api.nav.element

      return api.html.hx`
        <div>
          ${List({}, [
            items.map(Item)
          ])}
        </div>
      `
    },
    css: () => ({
    })
  })
}
