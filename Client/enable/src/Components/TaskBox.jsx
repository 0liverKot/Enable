import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const TaskBox = ({task, debt}) => {

    const textSX = {
        margin: 2
    }
    const decimalDaysLeft = (new Date(task.nextAppearance).getTime() - Date.now()) / 1000 / 60 / 60 / 24
    const daysLeft = Math.floor(decimalDaysLeft)
    const hoursLeft = Math.floor((decimalDaysLeft - daysLeft) * 24)
    var timeDisplay;

    if(daysLeft == 0) {
        timeDisplay = hoursLeft + " Hours Remaining" 
    } else {
        timeDisplay = daysLeft + " Days " + hoursLeft + " Hours Remaining"
    }

    return (
        <>
        <Paper 
        elevation={10}
        sx={{
            border: "1px solid gray",
            borderRadius: 5,
            padding: 2,
            bgcolor: "primary.secondary",
        }}> 
            <Box 
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography 
                variant="h5"
                sx={textSX}>
                    {task.taskName}
                </Typography>
            
                <Typography
                variant="body2"
                sx={textSX}>
                    {timeDisplay}
                </Typography>
            </Box>
            
            <Typography
            variant="h7"
            sx={textSX}>
                Task Description: 
            </Typography>
            <Box
            sx={{
                border: "1px solid gray",
                borderRadius: 2,
                mt: 1
            }}>
                <Typography
                sx={textSX}>
                    {task.taskDescription}
                </Typography>
            </Box>
            
            {!debt && (
                <>
                <Typography
                sx={textSX}>
                    Amount Remaining: 
                </Typography>
                </>
            )}

        </Paper>
        </>
    )
}

export default TaskBox;