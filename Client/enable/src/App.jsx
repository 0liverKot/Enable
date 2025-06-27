import React from "react";
import Navbar from "./Components/Navbar"
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

export default () => (
  <>
  <ThemeProvider theme={theme}>
    <Navbar/>
  </ThemeProvider>
  </>
);
