module.exports = {
  needs: {
    'html.create': 'first'
  },
  create: (api) => {
    return renderQuantity

    function renderQuantity (qty) {
      return api.html.create`
        <span>
          ${qty.value}
          ${qty.unit}
        </span>
      `
    }
  }
}
