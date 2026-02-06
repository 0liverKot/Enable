import React, { useState, useEffect } from "react";
import { Form, useSearchParams } from "react-router";
import { getTask } from "./api/taskMethods";
import Bars from "./Components/Bars";
import Navbar from "./Components/Navbar";
import { TextField, Paper, Container, Grid, Box, Typography, Button, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const Task = () => {

    let [searchParams] = useSearchParams();
    const taskId = searchParams.get("id")

    const [task, setTask] = useState([])
    const [taskSet, setTaskSet] = useState(false)
    const [edit, setEdit] = useState(false)
    // following variables used in updating tasks, not used in rendering the page
    const [taskName, setTaskName] = useState()
    const [taskDescription, setTaskDescription] = useState()
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [frequency, setFrequency] = useState(0)
    const [customfrequency, setCustomFrequency] = useState()
    const [hideCustomFrequency, setHideCustomFrequency] = useState(true)
    const [customFrequencyError, setCustomFrequencyError] = useState({boolean: false, message: ""})

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
        margin: 2,
    }

    const textFieldSX = {
        width: "90%",
        m: 2,
        "& .MuiInputLabel-root": {
            color: "text.primary"            
        }
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

    const handleSubmit = () => {
        if(!validFrequencyOption()) {
            setCustomFrequencyError({boolean: true, message: "Invalid Custom frequency"})
            return;
        }
        
        setCustomFrequencyError({boolean: false, message: ""})

    }

    const validFrequencyOption = () => {
        if(frequency !== "CUSTOM") {
            return true
        }
        if(!customfrequency) {
            return false
        }

        return /^\d+(?:\/\d+)*$/.test(customfrequency.trim())
    }

    const handleHourChange = (event) => {
        setHours(event.target.value)
    }

    const handleMinuteChange = (event) => {
        setMinutes(event.target.value)
    } 

    const handleFrequencyChange = (event) => {
        
        if(event.target.value === "CUSTOM") {
            setHideCustomFrequency(false)
        } else if (hideCustomFrequency === false) {
            setHideCustomFrequency(true)
            setCustomFrequencyError({boolean: false, message: ""})
        }

        setFrequency(event.target.value)
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
                                color: "text.primary",
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

                                <TextField size="small" 
                                label='Task Name' 
                                variant="standard"
                                sx={textFieldSX}
                                onChange={(event) => {setTaskName(event.target.value)}}/>

                                <TextField multiline 
                                label="Task Description" 
                                variant="standard"
                                maxRows={4}
                                sx={textFieldSX}
                                onChange={(event) => {setTaskDescription(event.target.value)}}/>
                                
                                <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    m: 2
                                }}> 
                                    <FormControl fullWidth>
                                    <InputLabel sx={{color: "text.primary"}} id="hours-select-label">Hours</InputLabel>
                                    <Select
                                    labelId="hours-select-label"
                                    label="Hours"
                                    onChange={handleHourChange}>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                    </Select>
                                    </FormControl>
                                    
                                    <FormControl fullWidth>
                                    <InputLabel sx={{color: "text.primary"}} id="minutes-select-label">Minutes</InputLabel>
                                        <Select
                                        labelId="minutes-select-id"
                                        label="Minutes"
                                        onChange={handleMinuteChange}>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>25</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={35}>35</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                            <MenuItem value={45}>45</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={55}>55</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>                                    
                                    
                                <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    m: 2
                                }}>
                                    <FormControl fullWidth>
                                    <InputLabel sx={{color: "text.primary"}}
                                    id='frequency-select-label'>Frequency</InputLabel>
                                        <Select
                                        labelId="frequency-select-label"
                                        label='Frequency'
                                        onChange={handleFrequencyChange}>
                                            <MenuItem value={"DAILY"}>Daily</MenuItem>
                                            <MenuItem value={"EVERY_OTHER_DAY"}>Every Other Day</MenuItem>
                                            <MenuItem value={"WEEKLY"}>Weekly</MenuItem>
                                            <MenuItem value={"BI_WEEKLY"}>Bi-Weekly</MenuItem>
                                            <MenuItem value={"CUSTOM"}>Custom</MenuItem>
                                        </Select>
                                    </FormControl>
                                
                                    <TextField size="small"
                                    disabled={hideCustomFrequency}
                                    label='Custom Frequency'
                                    variant="standard"
                                    sx={textFieldSX}
                                    error={customFrequencyError.boolean}
                                    onChange={(event => {setCustomFrequency(event.target.value)})}/>

                                </Box>

                                {!hideCustomFrequency && (
                                    <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                    <Typography
                                    sx={{width: "90%"}} variant="b2">
                                        For a custom frequency option use the following format: {"<days>/<days>/... \n"} .
                                        
                                        {" 2/1"} will give the task in 2 days, then 1 day repeatedly.
                                    </Typography>
                                    </Box>
                                )}

                                <Box sx={{display: "flex", ml: 2, mt: 2, height: "5%", alignItems: "flex-start"}}>
                                <Button variant="contained" startIcon={<EditIcon/>}
                                onClick={handleSubmit}
                                sx={{
                                    color: "text.primary",
                                    bgcolor: "primary.secondary", 
                                    "&:hover": {
                                    scale: 1.1
                                    }
                                }}>
                                Submit Changes
                                </Button>
                                
                                {customFrequencyError.boolean && (
                                    <Typography sx={{ml: 2}} color="error.main">{customFrequencyError.message}</Typography>
                                )}
                                
                                </Box>
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