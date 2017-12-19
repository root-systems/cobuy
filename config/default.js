const deepExtend = require('deep-extend')

var config = {
  port: 3000,
  favicon: 'app/favicon.ico',
  app: {
    name: 'Cobuy',
    tagline: 'Helping you buy good food, together',
    bodyText: 'Cobuy is an app that makes buying groups easy to start, maintain, and grow. Using the collective buying power of a group, we can buy food in bulk directly from wholesalers. By cutting out retailers, we effectively eliminate retail food waste, save money and have access to a wider range of better quality products.',
    url: 'http://localhost:3000',
  },
  assets: {
    root: 'app/assets',
    url: 'http://localhost:3000/',
    background: {
      small: 'cobuy-bg-sml-1080.jpg',
      large: 'cobuy-bg-lrg-1440.jpg'
    }
  },
  bundler: {
    head: `
      <style id="app-styles"></style>
      <style id="app-fonts"></style>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    `,
    body: `<div id='app'></div>`
  }
}

/*

const browserConfigPaths = [
  'assetsUrl'
]

// this breaks webpack in storybook, wtf?
// https://github.com/webpack/webpack/issues/4039

const getBrowserConfig = pipe(
  toPairs,
  reduce((sofar, [key]) => {
    const value = path(key, config)
    return assocPath(key, value, config)
  }, {})
)

config.browser = getBrowserConfig(config)
*/

config.browser = {
  app: config.app,
  assets: config.assets
}

module.exports = deepExtend(
  require('dogstack-agents/config'),
  config
)

console.log('config', module.exports)
