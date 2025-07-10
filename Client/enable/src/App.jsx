import React from "react";
import Navbar from "./Components/Navbar"
import TotalBars from './Components/TotalBars'
import theme from "./theme";
import UpcomingDisplay from './Components/UpcomingDisplay'
import AllBarsDisplay from './Components/AllBarsDisplay'
import { ThemeProvider } from "@emotion/react";
import { Container, Grid, Toolbar } from "@mui/material";

export default () => (
  <>
  <ThemeProvider theme={theme}>
    <Navbar/>
    <Container maxWidth={"xl"}>
        <Grid container
        spacing={8}
        sx={{
            justifyContent: "center",
            alignItems: "center",
            border: "solid 2px black",
            height: "90vh"
        }}>
            <Grid size={3}>
                <TotalBars/>
            </Grid>
            <Grid size={6}>
                <AllBarsDisplay/>
            </Grid>
            <Grid size={3}>
                <UpcomingDisplay/>
            </Grid>
        </Grid>
    </Container>
  </ThemeProvider>
  </>
);
