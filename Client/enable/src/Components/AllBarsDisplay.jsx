import { Grid } from "@mui/material";
import React from "react";
import Bars from "./Bars";
import { Paper } from "@mui/material";

const AllBarsDisplay = () => {

    const barsInfo = [
        {due: 70, debt: 30},
        {due: 70, debt: 30},
        {due: 70, debt: 30},
        {due: 70, debt: 30},
        {due: 70, debt: 30},
        {due: 70, debt: 30},
    ]

    return (
        <Grid container
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }}
        rowGap={"2%"}
        sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}>
            {barsInfo.map((bars, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}
                // use of 49% is due to the 2% gap width 
                sx={{
                    height: "49%",
                    }}>
                    <Bars due={bars.due} debt={bars.debt}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default AllBarsDisplay;