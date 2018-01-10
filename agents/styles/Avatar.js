// (mw) just for fun, not for real
const containerPaddingBySize = {
  small: '0.5rem',
  medium: '0.75rem',
  large: '2rem'
}

// (mw) just for fun, not for real
const nameFontSizeByFormat = {
  large: '2rem',
  medium: '1rem'
}

export default {
  container: ({ size = 'small' }) => ({
    padding: containerPaddingBySize[size]
  }),
  name: ({ size }) => ({
    fontSize: nameFontSizeBySize[size]
  })
}
