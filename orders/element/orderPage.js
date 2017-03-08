const map = require('lodash/fp/map')
const mapValues = require('lodash/fp/mapValues')
const { StyleSheet } = require('fela-tools')
const { combineRules } = require('fela')

// TODO move to app style module
module.exports = {
  needs: {
    app: {
      styles: 'first',
      css: {
        a: 'first',
        column: 'first',
        ul: 'first'
      }
    },
    'app.styles': 'first',
    'inu.dispatch': 'first',
    'html.hx': 'first',
    'css.renderRule': 'first',
    'orders.element': {
      orderingItem: 'first',
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const { colors, fonts } = api.app.styles()
    const styleSheet = StyleSheet.create({
      container: api.app.css.column,
      header: {
        backgroundColor: colors.primary
      },
      a: api.app.css.a,
      title: {
        color: colors.brightest,
        fontFamily: fonts.sans,
        textAlign: 'center'
      },
      body: combineRules(api.app.css.column, api.app.css.ul, props => ({
        width: '80vw',
        margin: '0 auto'
      })),
      done: () => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textTransform: 'capitalize',
        textAlign: 'center',
        cursor: 'pointer',
        color: colors.accent,
        border: `1px solid ${colors.greyscale[4]}`,
        fontSize: '2rem',
        padding: '0.5rem',
        transition: 'background-color 1s ease',
        ':hover': {
          backgroundColor: colors.greyscale[2]
        }
      })
    })

    const renderStyles = mapValues(rule => {
      return api.css.renderRule(rule, {})
    })

    const mapOrderItems = map(api.orders.element.orderingItem)

    return renderOrder

    function renderOrder (order) {
      const { id, name, orderItems } = order

      const styles = renderStyles(styleSheet)

      return api.html.hx`
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
          <div class=${styles.done}>
            done!
          </div>
        </li>
      `
    }
  }
}
