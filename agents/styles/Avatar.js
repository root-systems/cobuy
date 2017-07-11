// (mw) just for fun, not for real
const containerPaddingBySize = {
  small: '0.5rem',
  medium: '0.75rem',
  large: '2rem'
}

// https://ant.design/components/avatar/

export default {
  container: ({ size = 'small' }) => ({
    padding: containerPaddingBySize[size]
  })
}
