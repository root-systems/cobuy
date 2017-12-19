// TODO: IK: figure out how / best way to dynamically load a theme based on app config

import tapinTheme from './app/themes/tapin'

export default {
  theme: tapinTheme,
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
      'https://fonts.googleapis.com/css?family=Roboto:400,400i,700'
    ])
    renderer.renderFont('Lobster Two', [
      'https://fonts.googleapis.com/css?family=Lobster+Two:700'
    ])
  }
}
