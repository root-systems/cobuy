module.exports = {
  needs: ['app.styles', 'first'],
  create: (api) => (props) => ({
    color: api.app.styles().colors.primary
  })
}
