const map = require('lodash/fp/map')
const assignAll = require('lodash/fp/assignAll')
const StyleSheet = require('stilr')

// TODO move to app style module
module.exports = {
  needs: {
    'app.styles': 'first',
    'inu.dispatch': 'first',
    'html.create': 'first',
    'orders.element': {
      orderingItem: 'first',
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const { colors, fonts, elements, mixins } = api.app.styles()
    const styles = StyleSheet.create({
      container: mixins.column,
      header: {
        backgroundColor: colors.primary
      },
      a: elements.a,
      title: {
        color: colors.brightest,
        fontFamily: fonts.sans,
        textAlign: 'center'
      },
      body: assignAll([mixins.column, elements.ul, {
        width: '80vw',
        margin: '0 auto'
      }])
    })

    const mapOrderItems = map(api.orders.element.orderingItem)

    return renderOrder

    function renderOrder (order) {
      const { id, name, orderItems } = order
      return api.html.create`
        <article class=${styles.container}>
          <header class=${styles.header}>
            <a
              class=${styles.a}
              href=${`/orders/${id}`}
            >
              <h1 class=${styles.title}>${name}</h1>
            </a>
          </header>
          <ul class=${styles.body}>
            ${mapOrderItems(orderItems)}
          </ul>
        </li>
      `
    }
  }
}
