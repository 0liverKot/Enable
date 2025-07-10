import React from "react";
import Bars from "./Bars";
import { Paper } from "@mui/material";


const TotalBars = ({totalDue, totalDebt}) => {

    return (
        <Paper elevation={10}
         sx={{
            marginTop: 1,
            marginBottom: 1,
            borderRadius: 5
         }}>
            <Bars due={100} debt={50}/>
        </Paper>
    )
}

export default TotalBars