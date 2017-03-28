const map = require('lodash/fp/map')
const mapValues = require('lodash/fp/mapValues')

// TODO move to app style module
module.exports = {
  needs: {
    app: {
      css: {
        a: 'first',
        column: 'first',
        ul: 'first'
      },
      'element.pageHeader': 'first'
    },
    'inu.dispatch': 'first',
    'html.hx': 'first',
    'orders.element': {
      orderingItem: 'first',
      cost: 'first',
      quantity: 'first'
    }
  },
  create: (api) => {
    const { connect, combineRules } = api.css
    
    const Styles = props => renderRule => ({
      container: api.app.css.column,
      header: ({ theme }) => {
        backgroundColor: theme.colors.primary
      },
      a: api.app.css.a,
      title: ({ theme }) => ({
        color: theme.colors.brightest,
        fontFamily: theme.fonts.sans,
        textAlign: 'center'
      }),
      body: combineRules(api.app.css.column, api.app.css.ul, props => ({
        width: '80vw',
        margin: '0 auto'
      })),
      done: ({ theme }) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textTransform: 'capitalize',
        textAlign: 'center',
        cursor: 'pointer',
        color: theme.colors.accent,
        border: `1px solid ${theme.colors.greyscale[4]}`,
        fontSize: '2rem',
        padding: '0.5rem',
        transition: 'background-color 1s ease',
        ':hover': {
          backgroundColor: theme.colors.greyscale[2]
        }
      })
    })

    const mapOrderItems = map(orderItem => {
      return api.orders.element.orderingItem({ orderItem })
    })

    return connect(Styles, renderOrder)

    function renderOrder ({ styles, order }) {
      const { id, name, orderItems } = order

      return api.html.hx`
        <article class=${styles.container}>
          ${api.app.element.pageHeader({
            link: `/orders/${id}`,
            title: name
          })}
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
