module.exports = {
  port: 3000,
  favicon: 'app/favicon.ico',
  assets: 'assets',
  bundler: {
    head: `
      <style id="app-styles"></style>
      <style id="app-fonts"></style>
    `,
    body: `<div id='app'></div>`,
  },
  auth: {
    secret: 'CHANGE-ME',
    service: 'accounts',
    entity: 'account',
    local: {
      service: 'accounts',
      entity: 'account'
    }
  }
}
