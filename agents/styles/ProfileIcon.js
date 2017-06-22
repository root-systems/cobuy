const fontSizeByFormat = {
  page: '2rem',
  icon: '1rem'
}

export default {
  container: () => ({}),
  name: ({ format }) => ({
    fontSize: fontSizeByFormat[format]
  })
}
