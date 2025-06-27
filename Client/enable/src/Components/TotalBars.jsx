import React from "react";
import Bars from "./Bars";
import { Box } from "@mui/material";

const TotalBars = ({totalDue, totalDebt}) => {

    return (
        <Box sx={{
            width: 0.25,
            marginTop: 1,
            marginBottom: 1,
        }}>
            <Bars due={100} debt={50}/>
        </Box>
    )
}

export default TotalBars