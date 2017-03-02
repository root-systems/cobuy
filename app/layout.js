const insertCss = require('insert-css')
const StyleSheet = require('stilr')

module.exports = {
  needs: {
    'html.create': 'first'
  },
  create: (api) => (view) => {
    // add styles on initial load
    if (process.browser) {
      // ensure this runs after ALL
      // modules have been loaded.
      process.nextTick(() => {
        insertCss(StyleSheet.render())
      })
    }

    return (model) => api.html.create`
      <div>
        <nav>
          <a href='/'>home</a>
          <a href=${`/orders`}>orders!</a>
          <a href='/nope'>nope</a>
        </nav>
        ${view(model)}
      </div>
    `
  }
}
