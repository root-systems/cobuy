
module.exports = {
  needs: {
    'app.css.ul': 'first'
  },
  create: (api) => {
    const { Element, combineRules } = api.css
    const { ul } = api.app.css

    const listStyle = combineRules(ul, () => ({
      listStyleType: 'none'
    }))
    const List = Element('menu', listStyle)

    return List
  }
}
