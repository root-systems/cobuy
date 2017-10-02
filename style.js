import baseTheme from './app/themes/base'
import wsiwygtyles from './node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//this ^ is for the wysiwyg editor module in the profile...styles are transformed w browserify-css
export default {
  theme: baseTheme,
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
