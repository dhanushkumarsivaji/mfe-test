import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';
import { fontFamily } from './constants';
import typography from './typography';
import palette from './palette';
// import TTCommonsProRegular from '../../fonts/TTCommonsProRegular.ttf';
// import TTCommonsProClasicRegular from '../../fonts/TTCommonsClassicRegular.ttf';
// import TTCommonsProCondensedRegular from '../../fonts/TTCommonsProCondensedRegular.ttf';
// import TTCommonsProMedium from '../../fonts/TTCommonsProMedium.ttf';

const ttCommonsPro = {
  fontFamily,
  // src: ` 
  //     local('TT Commons Pro'),
  //     url(${TTCommonsProRegular}) format('truetype'),
  //     url(${TTCommonsProClasicRegular}) format('truetype'),
  //     url(${TTCommonsProCondensedRegular}) format('truetype')
  //   `
};


const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [ttCommonsPro]
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});


export default theme;
