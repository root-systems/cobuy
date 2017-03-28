module.exports = {
  create: (api) => {
    const { Element } = api.css

    const itemStyle = () => ({
      display: 'block',
      padding: '1rem',
      color: 'unset',
      textDecoration: 'none'
    })
    const Item = Element('a', itemStyle, {
      passThrough: ['href']
    })

    return props => {
      const { href, onNavigate, label } = props
      return Item({
        href,
        events: {
          click: onNavigate
        }
      }, label)
    }
  }
}
