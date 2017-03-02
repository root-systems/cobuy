module.exports = {
  create: () => () => ({
    colors: {
      primary: '#22d1aa',
      accent: '#ed800b',
      brightest: '#fff',
      brighter: '',
      bright: '',
      dark: '',
      darker: '',
      darkest: ''
    },
    fonts: {
      sans: 'Helvetica, Arial, sans-serif'
    },
    elements: {
      a: {
        textDecoration: 'none',
        color: 'unset'
      },
      ul: {
        margin: '0',
        padding: '0'
      },
      fieldset: {
        border: 'none',
        padding: '0rem'
      }
    },
    mixins: {
      row: {
        display: 'flex',
        flexDirection: 'row'
      },
      column: {
        display: 'flex',
        flexDirection: 'column'
      },
      screenReaderOnly: {
        clip: 'rect(1px, 1px, 1px, 1px)',
        position: 'absolute',
        height: '1px',
        width: '1px',
        overflow: 'hidden'
      }
    }
  })
}
