const containerPaddingBySize = {
  small: '0.5rem',
  medium: '0.75rem',
  large: '1rem'
}

const nameFontSizeBySize = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem'
}

// https://ant.design/components/avatar/

export default {
  container: ({ size }) => ({
    backgroundColor: '#fef',
    padding: containerPaddingBySize[size]
  }),
  name: ({ size }) => ({
    fontSize: nameFontSizeBySize[size],
    fontWeight: size === 'large' ? 'bold' : 'normal',
    textAlign: 'center'
  })
}
