import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTask } from "./api/taskMethods";
import Bars from "./Components/Bars";
import Navbar from "./Components/Navbar";
import { TextField, Paper, Container, Grid, Box, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const Task = () => {

    let [searchParams] = useSearchParams();
    const taskId = searchParams.get("id")

    const [task, setTask] = useState([])
    const [taskSet, setTaskSet] = useState(false)
    const [edit, setEdit] = useState(false)

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

    const handleEditClick = () => {
        setEdit(true)
    }

    const taskContainerSx = {
        borderRadius: 5,
        height: "100%",
        width: "70%",
        bgcolor: "primary.secondary",
        padding: 2,
        "&:hover" : {
            opacity: "1.0",
            scale: 1.05
        }
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
                    <Grid size={8} sx={{height: "90%"}}> 
                        <Box 
                        sx={{
                            height: "100%",
                            width: "100%",
                            border: "1px solid grey",
                            borderRadius: 10,
                        }}>
                        
                        {
                        // Applies background with opacity
                        // Child of container to prevent other children inheriting the opacity
                        }
                        <Box 
                        sx={{
                            position: "absolute",
                            width: "49.1%",
                            height: "71.7%",
                            bgcolor: "primary.secondary",
                            opacity: 0.8,
                            borderRadius: 10
                        }}>
                        </Box>

                        <Box 
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                            padding: 5
                        }}>
                        <Box sx={{width: "25%", height: "100%"}}>
                            <Bars due={task.durationMinutes - task.minutesDone} debt={task.debtMinutes}/>
                        </Box>
                        
                        {!edit && (
                            <Paper elevation={10} sx={taskContainerSx}>
                            
                            <Typography variant="h5" sx={textSX}> {`Task Name : ${task.taskName}`} </Typography>

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
                            onClick={handleEditClick}
                            sx={{
                                ml: 2,
                                bgcolor: "primary.secondary", 
                                "&:hover": {
                                    scale: 1.1
                                }
                            }}>
                                Edit
                            </Button>
                            </Paper>
                        )}

                        {edit && (
                            <Paper elevation={10} sx={taskContainerSx}>

                                <Typography variant="h5" sx={textSX}> Edit Task : </Typography>

                                <Box 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 5
                                }}>
                                    <Typography variant="h7" sx={textSX}> Task Name : </Typography>
                                    <TextField size="small" sx={{width: "75%"}} label={task.taskName} variant="standard"/>
                                </Box>

                                <Typography variant="h7" sx={textSX}> Task Description : </Typography>
                                <TextField multiline sx={{ml: 2, width: "90%"}} 
                                label={task.taskDescription} variant="standard"
                                minRows={2} maxRows={2}/>
                            
                            </Paper>
                        )}
                        </Box>
                        </Box>
                        </Grid>

                    <Grid size={4} sx={{height: "90%"}}>
                        <Box 
                        sx={{
                            height: "100%",
                            width: "100%",
                            bgcolor: "primary.secondary",
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