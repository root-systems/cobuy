module.exports = {
  create: (api) => {
    const { Element } = api.css

    const toggleStyles = ({ theme }) => ({
      position: 'fixed',
      cursor: 'pointer',
      padding: '1rem',
      fontSize: '2.25rem',
      color: theme.colors.greyscale[0]
    })
    const Toggle = Element('div', toggleStyles)

    return props => {
      const { onToggle } = props

      return Toggle({
        events: {
          click: onToggle
        }
      }, '≡')
    }
  }
}
