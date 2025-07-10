import { Grid } from "@mui/material";
import React from "react";
import Bars from "./Bars";

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
        <Grid container spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            {barsInfo.map((bars, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Bars due={bars.due / 5} debt={bars.debt}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default AllBarsDisplay;