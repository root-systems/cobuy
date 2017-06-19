export default {
  fontNode: '#app-fonts',
  setup: (renderer) => {
    renderer.renderStatic(
      {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        fontFamily: 'Lato'
      },
      'html,body,#app'
    )
    renderer.renderStatic({ display: 'flex' }, 'div')
    renderer.renderFont('Lato', [
      'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff'
    ])
  }
}
