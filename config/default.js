const mergeAll = require('ramda/src/mergeAll')

const config = {
  port: 3000,
  favicon: 'app/favicon.ico',
  assets: 'assets',
  bundler: {
    head: `
      <style id="app-styles"></style>
      <style id="app-fonts"></style>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    `,
    body: `<div id='app'></div>`,
  }
}

module.exports = mergeAll([
  config,
  require('dogstack-agents/config')
])
