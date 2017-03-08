const { combineRules } = require('fela')

module.exports = {
  needs: {
    'html.hx': 'first',
    'app.css.ul': 'first'
  },
  create: (api) => ({
    html: (props, children) => api.html.hx`
      <menu>
        ${children}
      </menu>
    `,
    css: combineRules(api.app.css.ul, () => ({
      listStyleType: 'none'
    }))
  })
}
