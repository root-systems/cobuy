module.exports = {
  create: () => (props) => ({
    clip: 'rect(1px, 1px, 1px, 1px)',
    position: 'absolute',
    height: '1px',
    width: '1px',
    overflow: 'hidden'
  })
}
