module.exports = {
  create: (api) => {
    const { Element } = api.css

    const overlayStyles = ({ theme }) => ({
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: theme.colors.greyscale[6],
      opacity: 0.6
    })
    const Overlay = Element('div', overlayStyles)

    return props => Overlay({
      events: {
        click: props.emitToggle
      }
    })
  }
}
