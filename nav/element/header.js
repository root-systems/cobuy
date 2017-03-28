module.exports = {
  create: (api) => {
    const { Element } = api.css

    const headerStyle = ({ theme }) => ({
      paddingTop: '3rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingBottom: '1rem',
      backgroundColor: theme.colors.primary,
      color: theme.colors.greyscale[0]
    })
    const Header = Element('div', headerStyle)

    const nameStyle = () => ({})
    const Name = Element('h1', nameStyle)

    const emailStyle = () => ({})
    const Email = Element('h2', emailStyle)

    return ({ agent }) => Header({}, [
      Name(agent.name),
      Email(agent.email)
    ])
  }
}
