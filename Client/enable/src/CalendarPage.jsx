import React from "react";
import theme from "./theme";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";

const CalendarPage = () => {



    return (
        <>
        <ThemeProvider theme={theme}>
        <Navbar currentPage={"calendar"}/>
            <Container maxWidth={"xxl"}>
                <Grid container>
                    <Grid size={3}>
                        
                    </Grid>
                    <Grid size={9}>
                        <>
                        calendar
                        </>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
        </>
    )
}

export default CalendarPage;