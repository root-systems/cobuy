module.exports = {
  needs: {
    'html.create': 'first'
  },
  create: (api) => (view) => {
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
