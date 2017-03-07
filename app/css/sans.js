module.exports = {
  needs: ['app.styles', 'first'],
  create: (api) => (props) => ({
    fontFamily: api.app.styles().fonts.sans
  })
}
