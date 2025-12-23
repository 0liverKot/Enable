import React from "react";
import Navbar from "./Components/Navbar"
import TotalBars from './Components/TotalBars'
import theme from "./theme";
import UpcomingDisplay from './Components/UpcomingDisplay'
import AllBarsDisplay from './Components/AllBarsDisplay'
import { ThemeProvider } from "@emotion/react";
import { Container, Grid, Toolbar } from "@mui/material";
import CheckToken from "./utils/checkToken";
import RedirectToSignUp from "./utils/RedirectToSIgnUp";

const Dashboard = () => {
    
    if(!CheckToken()) {
        return (
            RedirectToSignUp()
        )
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <Navbar currentPage={"dashboard"}/>
            <Container maxWidth={"xl"}>
                <Grid container
                spacing={10}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    height: "80vh",
                }}>
                    <Grid size={3} sx={{
                        height: "90%"}}>
                        <TotalBars/>
                    </Grid>
                    <Grid size={6} sx={{
                        height: "90%",
                        justifyContent: "center",
                        alignContent: "center"}}>
                        <AllBarsDisplay/>
                    </Grid>
                    <Grid size={3}>
                        <UpcomingDisplay/>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
        </>
    )
}

export default Dashboard;
