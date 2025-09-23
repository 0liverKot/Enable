import React from "react";
import theme from "./theme";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "@emotion/react";

const CalendarPage = () => {

    return (
        <>
        <ThemeProvider theme={theme}>
        <Navbar currentPage={"calendar"}/>
        </ThemeProvider>
        </>
    )
}

export default CalendarPage;