const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')

module.exports = {
  needs: {
    'inu.dispatch': 'first',
    'html.hx': 'first',
    //'nav.plugs.link': 'map'
    nav: {
      'action.toggle': 'first',
      element: {
        toggle: 'first',
        overlay: 'first',
        drawer: 'first'
      }
    }
  },
  create: (api) => ({
    html: (props) => {
      const { toggle: Toggle, overlay: Overlay, drawer: Drawer } = api.nav.element

      const toggleOnNavigate = map(item => {
        return assign(item, { onNavigate: emitToggle })
      })

      const drawer = {
        header: {
          agent: {
            name: 'Jodi Zimmerman',
            email: 'jodiz@abc.com'
          }
        },
        body: {
          items: toggleOnNavigate([{
            href: '/',
            label: 'home'
          }, {
            href: '/orders',
            label: 'orders'
          }])
        },
        footer: {
          items: toggleOnNavigate([{
            href: '/settings',
            label: 'settings'
          }, {
            href: '/logout',
            label: 'log out'
          }])
        }
      }

      return api.html.hx`
        <div>
          ${Toggle({
            onToggle: emitToggle
          })}
          ${props.isExpanded
            ? [
              Drawer(drawer),
              Overlay({
                emitToggle
              })
            ]
            : null
          }
        </div>
      `

      function emitToggle () {
        const action = api.nav.action.toggle()
        api.inu.dispatch(action)
      }
    },
    css: (props) => {}
  })
}
