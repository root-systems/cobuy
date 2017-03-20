module.exports = {
  needs: {
    'html.hx': 'first',
    'inu.dispatch': 'first',
    'router.go': 'first',
    'orders.element.orderDate': 'first',
    'css.renderRule': 'first',
    'app.styles': 'first'
  },
  create: (api) => ({
    html: (order) => {
      const { colors } = api.app.styles()
      const titleRule = props => ({
        marginTop: '0rem',
        fontSize: '2rem'
      })
      const titleClass = api.css.renderRule(titleRule, order)

      const arrowRule = props => ({
        color: colors.greyscale[6],
        fontSize: '2rem',
        position: 'absolute',
        top: 'calc(50% - 1rem)',
        right: '1.5rem'
      })
      const arrowClass = api.css.renderRule(arrowRule, order)

      return api.html.hx`
        <section ev-click=${handleClick}>
          <h2 class=${titleClass}>${order.name}</h2>
          ${api.orders.element.orderDate(order)}
          <span class=${arrowClass}>🡲</span>
        </section>
      `

      function handleClick (ev) {
        api.inu.dispatch(api.router.go(`/orders/${order.id}`))
      }
    },
    css: (order) => {
      const { colors } = api.app.styles()
      return {
        position: 'relative',
        padding: '1rem',
        borderBottom: `1px solid ${colors.greyscale[2]}`
      }
    }
  })
}
