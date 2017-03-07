module.exports = {
  needs: {
    'html.hx': 'first'
  },
  create: (api) => {
    return renderQuantity

    function renderQuantity (qty) {
      return api.html.hx`
        <span>
          ${qty.value}
          ${qty.unit}
        </span>
      `
    }
  }
}
