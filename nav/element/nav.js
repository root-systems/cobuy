const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')

module.exports = {
  needs: {
    'inu.dispatch': 'first',
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
  create: (api) => {
    const { Element } = api.css
    const { toggle: Toggle, overlay: Overlay, drawer: Drawer } = api.nav.element

    const navStyle = () => ({})
    const Nav = Element('div', navStyle)

    return (props) => {
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

      return Nav([
        Toggle({
          onToggle: emitToggle
        }),
        props.isExpanded
          ? [
            Drawer(drawer),
            Overlay({
              emitToggle
            })
          ]
          : null
      ])

      function emitToggle () {
        const action = api.nav.action.toggle()
        api.inu.dispatch(action)
      }
    }
  }
}
