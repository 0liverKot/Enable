import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTask } from "./api/taskMethods";
import Bars from "./Components/Bars";
import Navbar from "./Components/Navbar";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const Task = () => {

    let [searchParams] = useSearchParams();
    const taskId = searchParams.get("id")

    const [task, setTask] = useState([])
    const [taskSet, setTaskSet] = useState(false)
    
    useEffect(() => {
        async function fetchTask(id) {
            const response = await getTask(id)
            setTask(response.data)
            setTaskSet(true)
        }
        fetchTask(taskId);
    }, []);    

    const decimalDaysLeft = (new Date(task.nextAppearance).getTime() - Date.now()) / 1000 / 60 / 60 / 24
    const daysLeft = Math.floor(decimalDaysLeft)
    const hoursLeft = Math.floor((decimalDaysLeft - daysLeft) * 24)
    var timeDisplay;

    if(daysLeft == 0) {

        timeDisplay = "Due in : " + hoursLeft + " Hours"
    } else {
        timeDisplay = "Due in : " + daysLeft + " Days " + hoursLeft + " Hours"
    }

    const textSX = {
        margin: 2
    }

    var frequencyDispay = "Frequency : Every ";
    switch (parseInt(task.frequency)) {
        case 1:
            frequencyDispay += " Day " 
            break;
        case 2: 
            frequencyDispay += " Other Day"
            break;
        case 7: 
            frequencyDispay += " Week "
            break; 
        case 14:
            frequencyDispay += " Other Week "
            break;
        default:
            frequencyDispay += task.frequency + " Days "
            break 
    }

    return (
        <>
        <Navbar currentPage={"tasks"}/>
            {taskSet && (
                <Container maxWidth={"xl"}>
                <Grid
                container
                spacing={10}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    margin: 2
                }}>
                    <Grid size={2} sx={{height: "90%"}}>
                        <Bars due={task.durationMinutes - task.minutesDone} debt={task.debtMinutes}/>
                    </Grid>

                    <Grid size={6} sx={{height: "90%"}}> 
                        <Box 
                        sx={{
                            height: "100%",
                            width: "100%",
                            bgcolor: "primary.main",
                            border: "1px solid grey",
                            opacity: 0.8,
                            borderRadius: 10,
                            padding: 2
                        }}>
                        <Typography variant="h5" sx={textSX}>
                            {task.taskName}
                        </Typography>
                        <Typography
                        variant="h7"
                        sx={textSX}>
                            Task Description : 
                        </Typography>
                        <Box
                        sx={{
                            border: "1px solid gray",
                            borderRadius: 2,
                            m: 2,
                            height: "50%"
                        }}>
                            <Typography
                            sx={textSX}>
                                {task.taskDescription}
                            </Typography>
                        </Box>
                        
                        <Box
                        sx={{
                            display: "flex",
                            border: "1px solid gray",
                            borderRadius: 2,
                            m: 2,
                            padding: 2
                        }}>
                            <Typography variant="h7" 
                            sx={{
                                width: "50%",
                                m: 2
                            }}>
                                {timeDisplay}
                            </Typography>

                            <Typography variant="h7" 
                            sx={{
                                width: "50%",
                                m: 2
                            }}>
                                {frequencyDispay}
                            </Typography>                         
                        </Box>

                        <Button variant="contained" startIcon={<EditIcon/>}
                        sx={{
                            m: 2
                        }}>
                            Edit
                        </Button>

                        </Box>
                    </Grid>

                    <Grid size={4} sx={{height: "90%"}}>
                        <Box 
                        sx={{
                            height: "100%",
                            width: "100%",
                            bgcolor: "primary.main",
                            border: "1px solid grey",
                            opacity: 0.8,
                            borderRadius: 10,
                            padding: 2
                        }}>
                        </Box>
                    </Grid>
                
                </Grid>
                </Container>
            )}
        </>
    )
}

export default Task;