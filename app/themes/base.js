import {
  teal500,
  teal600,
  teal700,
  deepPurple500,
  deepPurple600,
  deepPurple700,
  grey50,
  grey100,
  grey200,
  grey300,
  grey400,
  grey500,
  grey600,
  grey700,
  grey800,
  grey900,
  darkBlack,
  fullBlack,
  white
} from 'material-ui/styles/colors'

// GK: theme structure following https://github.com/jxnblk/styled-system/blob/master/README.md

export default {
  breakpoints: [
    32, 48, 64
  ],
  space: [
    0, 6, 12, 18, 24
  ],
  fontSizes: [
    12, 16, 18, 24, 36, 72
  ],
  colors: {
    primary1: teal500,
    primary2: teal600,
    primary3: teal700,
    accent1: deepPurple500,
    accent2: deepPurple600,
    accent3: deepPurple700,
    greys: [
      grey50,
      grey100,
      grey200,
      grey300,
      grey400,
      grey500,
      grey600,
      grey700,
      grey800,
      grey900
    ],
    text: darkBlack,
    alternateText: white,
    canvas: white,
    border: grey300,
    shadow: fullBlack
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900
  },
  em: '1em',
  rem: '1rem',
  fontFamily: 'Roboto, sans-serif',
  borderRadius: '2px',
  zIndexMax: 1000
}
