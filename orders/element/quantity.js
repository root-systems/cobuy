module.exports = {
  create: (api) => {
    const quantityStyle = (props) => ({})
    const Quantity = api.css.Element('span', quantityStyle)

    return (qty) => {
      return Quantity([
        qty.value,
        qty.unit
      ])
    }
  }
}
