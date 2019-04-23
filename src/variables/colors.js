import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

// const accent = purple.A200; // #E040FB (alternative method)

export const colors = {
  text: {
    white: blueGrey[50],

    grey: blueGrey[500],
    darkGrey: blueGrey[800],

    lightGreen: green[200],
    green: green[500],
    darkGreen: green[900],
  },

  background: {
    white: blueGrey[50],
  },

  normal: {
    primary: purple[500],

    textGrey: blueGrey[500],

    primary40: 'rgba(63, 81, 181, .4)',
    secondary: 'rgba(253, 213, 115, 1)',
    secondary40: 'rgba(253, 213, 115, .4)',
    orange: 'rgba(244, 96, 54, 1)',
    orange40: 'rgba(244, 96, 54, .4)',
    red: 'rgba(164, 36, 59, 1)',
    red40: 'rgba(164, 36, 59, .4)',
    lightText: 'rgba(234, 255, 250, 1)',
    lightText40: 'rgba(234, 255, 250, .4)',
    grayText: 'rgba(120, 120, 120, 1)',
    grayText40: 'rgba(120, 120, 120, .4)',
    darkText: 'rgba(39, 62, 71, 1)',
    darkText40: 'rgba(39, 62, 71, .4)',
    greyText: 'rgba(93, 146, 167, 1)',
    greyText40: 'rgba(93, 146, 167, .4)',
    inputBorder: 'rgba(221, 255, 247, 1)',
    inputBorder40: 'rgba(221, 255, 247, .4)',
    white: '#eee',
  },
  darker: {
    primary: 'rgba(52, 70, 193, 1)',
    secondary: 'rgba(255, 201, 67, 1)',
    orange: 'rgba(247, 77, 28, 1)',
    red: 'rgba(149, 18, 42, 1)',
    darkText: 'rgba(24, 55, 67, 1)',
    greyText: 'rgba(72, 133, 157, 1)',
    white: '#ddd',
  },
  lighter: {
    primary: 'rgba(70, 198, 180, 1)',
    secondary: 'rgba(255, 224, 149, 1)',
    orange: 'rgba(240, 110, 72, 1)',
    red: 'rgba(173, 72, 90, 1)',
    darkText: 'rgba(59, 74, 80, 1)',
    greyText: 'rgba(111, 157, 175, 1)',
  },
};
