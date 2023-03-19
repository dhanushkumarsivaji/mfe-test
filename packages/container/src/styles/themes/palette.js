const white = '#FFFFFF';
const black = '#000000';

const palette = {
  common: {
    black,
    white
  },
  primary: {
    extraLight: '#DDEAFF',
    light: '#DDEAFF',
    main: '#3769FF',
    dark: '#1446E1',
    contrastText: white
  },
  secondary: {
    light: '#6cc247',
    main: '#5abc2a',
    dark: '#589435',
    contrastText: white
  },
  success: {
    contrastText: white,
    dark: '#006600',
    main: '#006600',
    light: '#006600'
  },
  info: {
    contrastText: '#005ea5',
    dark: white,
    main: white,
    light: white
  },
  warning: {
    contrastText: white,
    dark: '#7986cb',
    main: '#7986cb',
    light: '#7986cb'
  },
  error: {
    light: '#e57373',
    main: '#CC0000',
    dark: '#d32f2f',
    contrastText: white,
    background: 'rgba(230,0,0,0.06)'
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#767676',
    700: '#616161',
    800: '#424242',
    900: '#333333',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161',
    A800: '#454545'
  },
  text: {
    primary: black,
    secondary: '#3769FF',
    disabled: '#9a9a9a',
    hint: '#aaaaaa',
    grey: '#726e70'
  },
  button: {
    grey: '#918c8b',
    green: '#5abc2a',
    blue: '#3769FF'
  },
  background: {
    paper: white,
    default: white,
    light: '#E1F3F8'
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)'
    // disabled: '#767676',
    // disabledBackground: '#767676'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  type: 'light',
  icon: '#005ea5',
  table: {
    header: '#ddeaff',
    row: {
      even: '#fafafa',
      odd: '#fefefe',
      hover: '#eff5ff'
    },
    score: {
      50: '#DC0546',
      75: '#FF9665',
      100: '#00847D'
    }
  },
  slider: {
    background: '#3769FF',
    rail: '#91B9FF',
    label: '#333333'
  },
  goal: {
    formFields: {
      background: '#DDEAFF',
      errorBackground: '#FFDDE6',
      errorLabel: '#FF0F52'
    },
    heading: {
      background: {
        content: '#698EFF',
        savingGoal: '#E1E9FF',
        clientInfo: '#B2C6FF',
        riskTolerance: '#C8D6FF'
      }
    },
    button: {
      disabled: '#E8E8E8'
    }
  },
  charts: {
    glidePath: {
      equity: '#B39AF5',
      fixedIncome: '#72DBD5',
      pie: {
        equity: '#6730E3',
        fixedIncome: '#00BFB3'
      },
      line: '#086bf7',
      label: {
        equity: '#6730E3',
        fixedIncome: '#00BFB3'
      }
    },
    portfolioComposition: {
      equity: '#6730E3',
      fixedIncome: '#00BFB3'
    }
  },
  wealthPath: {
    goodProb: '#00847D',
    moderateProb: '#FF9665',
    badProb: '#DC0546',
    yAxisPlotLine: '#000',
    tick: '#000',
    axisLabel: '#767676',
    title: '#000',
    crosshair: '#000',
    accumulationLine: '#6730E3',
    drawdownLine: '#C042EA',
    gridLine: '#fff'
  },
  recommendation: {
    amount: '#3769FF',
    amountBorderBottom: '#3769FF'
  },
  layout: {
    primary: '#3769FF'
  }
};

export default palette;
