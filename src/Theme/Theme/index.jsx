import { createTheme } from "@mui/material";

export const Colors = {
  primary: "#5d87ff",
  secondary: "#fff",
  light_gray: "#c2c2c2",
  bgColor: "#F5F5F5",
  BgColorLite: "#5d87ff1a",
  secondaryColor: "#8C9097",
  primaryTextColor: "#2a3547",
  menuItemBgColor: "#F5F5F9",
  dividerColor: "#083c8217",
  white: "#ffffff",
  tableHeaderBorder:'#2d395c45',
  hoverColorBtn:"#5273D0",

  ///////////////
  ////Grays
  ///////////////

  /////////////////
  //Solid Colors
  /////////////////
  // NO COLORS RIGHT NOW
};

const theme = createTheme({
  // to change whole website color

  palette: {
    primary: {
      main: Colors.primary,
      contrastText: Colors.white,
    },
    secondary: {
      main: Colors.secondary,
    },
    ErrorBtn: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
    ChipColor: {
      main: "#F4F7FF",
      contrastText: "#698AFF",
    },
    divider: Colors.dividerColor,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      mds: 1000,
      lg: 1200,
      xl: 1536,
      uxl: 2000,
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  // to target components wise

  components: {  
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.dividerColor, // Apply custom divider color
        },
      },
    },
  },
});

export default theme;
