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
// and https://github.com/cloudflare/cf-ui/blob/master/packages/cf-style-const/src/variables.js

export default {
  breakpoints: {
    mobile: '30em', // 480px,
    mobileWide: '37.5em', // 600px,
    tablet: '48em', // 768px,
    tabletWide: '56.25em', // 900px,
    desktop: '64em', // 1024px,
    desktopWide: '90em', // 1440px,
    desktopXL: '120em' // 1920px
  },
  space: [
    // http://tachyons.io/docs/layout/spacing/
    '0rem', // [0] SR: to override default allofthespace with noneofthespace
    '0.25rem', // [1]
    '0.5rem', // [2]
    '1rem', // [3]
    '2rem', // [4]
    '4rem', // [5]
    '8rem', // [6]
    '16rem', // [7]
    '32rem' // [8]
  ],
  fontSizes: {
    // typographic scale because
    // http://spencermortensen.com/articles/typographic-scale/
    // and
    // https://blog.madewithenvy.com/responsive-typographic-scales-in-css-b9f60431d1c4
    '-5': '0.50000em',
    '-4': '0.57435em', 
    '-3': '0.65975em',
    '-2': '0.75785em',
    '-1': '0.87055em',
    0: '1.00000em',
    1: '1.14869em',
    2: '1.31951em',
    3: '1.51572em',
    4: '1.74110em',
    5: '2.00000em',
    5: '2.00000em',
    6: '2.29740em',
    7: '2.63902em',
    8: '3.03143em',
    9: '3.48220em',
    10: '4.00000em',
    11: '4.59479em',
    12: '5.27803em',
    13: '6.06287em',
    14: '6.96440em',
    15: '8.00000em',
    16: '9.18959em',
    17: '10.55606em',
    18: '12.12573em',
    19: '13.92881em',
    20: '16.00000em'
    // continue with formula:
    //   multiplier ^ (step / interval)
    //   2 ^ (step / 5)
  },
  fonts: {
    primary: 'Roboto, sans-serif',
    logo: '"Lobster Two", cursive'
  },
  colors: {
    primary1: teal500,
    primary2: teal600,
    primary3: teal700,
    accent1: deepPurple500,
    accent2: deepPurple600,
    accent3: deepPurple700,
    greys: [
      grey50, // [0]
      grey100, // [1]
      grey200, // [2]
      grey300, // [3]
      grey400, // [4]
      grey500, // [5]
      grey600, // [6]
      grey700, // [7]
      grey800, // [8]
      grey900 // [9]
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
  borderRadius: '2px',
  zIndexMax: 1000
}
