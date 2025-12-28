import { Box, duration, Paper, Typography } from "@mui/material";
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

        timeDisplay = "Due in: " + hoursLeft + " Hours"
    } else {
        timeDisplay = "Due in: " + daysLeft + " Days " + hoursLeft + " Hours"
    }


    const minutesToComplete = task.durationMinutes
    const minutesDone = task.minutesDone
    const minutesRemaining = minutesToComplete - minutesDone
    var timeRemainingDisplay;

    if (minutesRemaining > 60) {
        const hoursRemaining = Math.floor(minutesRemaining / 60)
        const minutesRemainder = minutesRemaining % 60
        var timeRemainingDisplay = `${hoursRemaining} Hours ${minutesRemainder} Minutes: `
    } else {
        var timeRemainingDisplay = `${minutesRemaining} Minutes`
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
            mb: 2
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
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Typography
                    sx={textSX}>
                        Amount Remaining: 
                    </Typography>
                    <Typography
                    sx={textSX}>
                        {timeRemainingDisplay}
                    </Typography>
                    <Box 
                    sx={{
                        bgcolor: "secondary.main",
                        opacity: 0.5,
                        width: "50%",
                        height: 10,
                        borderRadius: 10
                    }}>
                        <Box
                        sx={{
                            width: `${task.minutesDone / task.durationMinutes}%`,
                            bgcolor: "secondary.light",
                            height: 10,
                            borderRadius: 10
                        }}
                        >
                        </Box>
                    </Box>

                </Box>
            )}

        </Paper>
        </>
    )
}

export default TaskBox;