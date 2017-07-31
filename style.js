export default {
  fontNode: '#app-fonts',
  setup: (renderer) => {
    renderer.renderStatic(
      {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        fontFamily: 'Roboto'
      },
      'html,body,#app'
    )
    renderer.renderFont('Roboto', [
      'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff'
    ])
    renderer.renderFont('Lobster Two', [
      'https://fonts.googleapis.com/css?family=Lobster+Two:700'
    ])
  }
}
