import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTask } from "./api/taskMethods";
import Bars from "./Components/Bars";
import Navbar from "./Components/Navbar";
import { Container, Grid, Box } from "@mui/material";

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
                            borderRadius: 10
                        }}>

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
                            borderRadius: 10
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