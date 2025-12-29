import React from "react";
import Bars from "./Bars";
import { Box } from "@mui/material";


const TotalBars = ({totalDue, totalDebt}) => {

    return (
        <Bars due={70} debt={50} total={true}/>
    )
}

export default TotalBars