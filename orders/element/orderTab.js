module.exports = {
  needs: {
    'inu.dispatch': 'first',
    'router.go': 'first',
    'orders.element.orderDate': 'first'
  },
  create: (api) => {
    const { Element } = api.css

    const Section = Element('section', ({ theme }) => ({
      position: 'relative',
      padding: '1rem',
      borderBottom: `1px solid ${theme.colors.greyscale[2]}`
    }))

    const Title = Element('h2', ({ theme }) => ({
      marginTop: '0rem',
      fontSize: '2rem'
    }))

    const Arrow = Element('span', ({ theme }) => ({
      color: theme.colors.greyscale[6],
      fontSize: '2rem',
      position: 'absolute',
      top: 'calc(50% - 1rem)',
      right: '1.5rem'
    }))

    return ({ order }) => {
      return Section({
        events: { click: handleClick }
      }, [
        Title(order.name),
        api.orders.element.orderDate(order),
        Arrow('🡲')
      ])

      function handleClick (ev) {
        api.inu.dispatch(api.router.go(`/orders/${order.id}`))
      }
    }
  }
}
