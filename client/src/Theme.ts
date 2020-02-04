import { createMuiTheme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    blue: PaletteColor;
  }

  interface PaletteOptions {
    blue: PaletteColorOptions;
  }

  interface Theme {
    appDrawer: {
      width: React.CSSProperties["width"];
      breakpoint: Breakpoint;
    };
  }
}

export default createMuiTheme({
  palette: {
    primary: {
      light: "#C1EFF4",
      main: "#006064",
      dark: "#7CA4A9",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#96F87D",
      main: "#62C44D",
      dark: "#2A931C",
      contrastText: "#FFFFFF"
    },
    blue: {
      light: "#72C3FF",
      main: "#3393DA",
      dark: "#0066A8",
      contrastText: "#FFFFFF"
    }
  }
});
