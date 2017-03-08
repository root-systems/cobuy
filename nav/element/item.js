module.exports = {
  needs: {
    'html.hx': 'first'
  },
  create: (api) => ({
    html: (props) => api.html.hx`
      <a
        href=${props.href}
        events=${{
          click: props.onNavigate
        }}
      >
        ${props.label}
      </a>
    `,
    css: () => {
      return {
        display: 'block',
        padding: '1rem',
        color: 'unset',
        textDecoration: 'none'
      }
    }
  })
}
