import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey, teal } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red.A700,
    },
    secondary: {
      main: teal["500"],
    },
    link: {
      main: "#065fd4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      system: grey["50"],
    },
  },
  fonts: {
    xs: 10,
    sm: 12,
    md: 14,
    bg: 16,
    lg: 18,
    xl: 20,
    bold: "bold",
  },
});

export default theme;
