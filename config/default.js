module.exports = {
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
  },
  auth: {
    strategies: [
      'local',
      'jwt',
      'oauth2'
    ],
    service: 'credentials',
    entity: 'credential',
    local: {
      service: 'credentials',
      entity: 'credential'
    },
    remote: {
      google: {
        label: 'Google',
        icon: 'fa fa-google',
        backgroundColor: '#ffffff'
      },
      facebook: {
        label: 'Facebook',
        icon: 'fa fa-facebook',
        backgroundColor: '#3b5998'
      },
      github: {
        type: 'oauth2',
        label: 'GitHub',
        icon: 'fa fa-github',
        backgroundColor: '#6d6d6d'
      }
    }
  }
}
