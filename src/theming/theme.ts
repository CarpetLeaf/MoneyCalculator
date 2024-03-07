import { createTheme } from "@mui/material";

export const primaryDark = "#191ea6";
export const primaryLight = "#789bf5";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryLight,
      contrastText: "#fff",
    },
  },
});

export const themeSecondary = createTheme({
  palette: {
    primary: {
      main: primaryDark,
      contrastText: "#fff",
    },
  },
});
