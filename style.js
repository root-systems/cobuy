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
        fontFamily: 'Roboto',
        backgroundColor: tapinTheme.colors.canvas
      },
      'html,body,#app'
    )
    // TODO: IK: get fela renderer.renderFont working properly for fonts
  }
}
