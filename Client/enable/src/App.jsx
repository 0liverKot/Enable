import React from "react";
import Navbar from "./Components/Navbar"
import TotalBars from './Components/TotalBars'
import theme from "./theme";
import UpcomingDisplay from './Components/UpcomingDisplay'
import AllBarsDisplay from './Components/AllBarsDisplay'
import { ThemeProvider } from "@emotion/react";
import { Container, Toolbar } from "@mui/material";

export default () => (
  <>
  <ThemeProvider theme={theme}>
    <Navbar/>
    <Container>
        <Toolbar>
            <TotalBars/>
            <AllBarsDisplay/>
            <UpcomingDisplay/>
        </Toolbar>
    </Container>
  </ThemeProvider>
  </>
);
