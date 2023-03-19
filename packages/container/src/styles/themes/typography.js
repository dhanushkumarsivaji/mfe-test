import palette from './palette';
import { responsiveFontSizes } from '../utils';
import { fontFamily } from './constants';

const typography = () => ({
  htmlFontSize: 16,
  fontFamily,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 300,
    fontSize: '3.125rem',
    lineHeight: '3.5rem',
    letterSpacing: '-0.01562em',
    ...responsiveFontSizes({
      sm: {
        fontSize: 'calc(2rem + (((100vw - 48rem) / (90 - 48))) * (3.125 - 2))',
        lineHeight: 'calc(2.75rem + (((100vw - 48rem) / (90 - 48))) * (2.125 - 1.5))'
      },
      lg: {
        fontSize: '2rem',
        lineHeight: '2.5rem'
      }
    })
  },
  h2: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 300,
    fontSize: '2.125rem',
    lineHeight: '2.5rem',
    letterSpacing: '-0.00833em',
    ...responsiveFontSizes({
      sm: {
        fontSize: 'calc(1.5rem + (((100vw - 48rem) / (90 - 48))) * (2.125 - 1.5))',
        lineHeight: 'calc( 1.75rem + (((100vw - 48rem) / (90 - 48))) * (2.125 - 1.5))'
      },
      lg: {
        fontSize: '1.5rem',
        lineHeight: '2.25rem'
      }
    })
  },
  h3: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 400,
    fontSize: '1.875rem',
    lineHeight: '2.5rem',
    letterSpacing: '0em',
    ...responsiveFontSizes({
      sm: {
        fontSize: 'calc(1.25rem + (((100vw - 48rem) / (90 - 48))) * (1.875 - 1.25))',
        lineHeight: 'calc(2rem + (((100vw - 48rem) / (90 - 48))) * (1.875 - 1.25))'
      },
      lg: {
        fontSize: '1.25rem',
        lineHeight: '1.875rem'
      }
    })
  },
  h4: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 800,
    fontSize: '1.375rem',
    lineHeight: '2.063rem',
    letterSpacing: '0.00735em',
    ...responsiveFontSizes({
      sm: {
        fontSize: 'calc(0.875rem + (((100vw - 48rem) / (90 - 48))) * (1.375 - 0.875))',
        lineHeight: 'calc(1.25rem + (((100vw - 48rem) / (90 - 48))) * (1.375 - 0.875))'
      },
      lg: {
        fontSize: '0.875rem',
        lineHeight: 'inherit'
      }
    })
  },
  h5: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 400,
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    letterSpacing: '0em',
    ...responsiveFontSizes({
      sm: {
        fontSize: 'calc(0.875rem + (((100vw - 48rem) / (90 - 48))) * (1.375 - 0.875))',
        lineHeight: '2.5rem'
      },
      lg: {
        fontSize: '1.125rem',
        lineHeight: 'inherit'
      }
    })
  },
  h6: {
    color: palette.text.grey,
    fontFamily,
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: '1.8rem',
    letterSpacing: '0.0075em'
  },
  body1: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 400,
    fontSize: 'calc(1rem + (1 - 1) * ((100vw - 20rem) / (120 - 20)))',
    lineHeight: 1.5,
    letterSpacing: '0.00938em'
  },
  subtitle1: {
    color: palette.text.primary,
    fontFamily,
    fontWeight: 400,
    fontSize: 'calc(1rem + (1 - 1) * ((100vw - 20rem) / (120 - 20)))',
    lineHeight: 1.75,
    letterSpacing: '0.00938em'
  },
  subtitle2: {
    color: palette.text.disabled,
    fontFamily,
    fontWeight: 500,
    fontSize: 'calc(1rem + (0.875 - 1) * ((100vw - 20rem) / (120 - 20)))',
    lineHeight: 1.57,
    letterSpacing: '0.00714em'
  },
  body2: {
    color: palette.text.grey,
    fontFamily,
    fontWeight: 400,
    fontSize: 'calc(1rem + (0.875 - 1) * ((100vw - 20rem) / (120 - 20)))',
    lineHeight: 1.43,
    letterSpacing: '0.01071em'
  },
  caption: {
    color: palette.text.disabled,
    fontFamily,
    fontWeight: 400,
    fontSize: 'calc(1rem + (0.75 - 1) * ((100vw - 20rem) / (120 - 20)))',
    lineHeight: 2.66,
    letterSpacing: '0.03333em'
  },
  button: {
    fontSize: '1rem',
    fontFamily,
    fontWeight: 500
  }
});

export default typography;
