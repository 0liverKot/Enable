import React, { useEffect, useState } from "react";
import { getTasksByUser } from "../api/taskMethods";
import { sortTasksByNextAppearance } from "../utils/sortTasksByNextAppearance";
import TaskBox from "./TaskBox";
import { Box, Typography } from "@mui/material";

const VerticalTasksList = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            const response = await getTasksByUser(localStorage.getItem("userId"))
            setTasks(response.data)
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        sortTasksByNextAppearance(tasks)
    }, [tasks]);


    return (
        <>
        {tasks.length !== 0 && (
            <Box
            sx={{
                bgcolor: "primary.main",
                opacity: 0.8,
                border: "1px solid gray",
                borderRadius: 10,
                height: "100%",
                padding: 2,
            }}> 
                <Typography
                variant="h5"
                sx={{
                    padding: 2
                }}>
                    Tasks Due : 
                </Typography>
                <Box 
                sx={{
                    height: "92%",
                    overflowY: "scroll",
                    '&::-webkit-scrollbar': {
                        position: "relative" // makes it dissapear 
                    }, 
                }}>
                {tasks.map((task, index) => (
                    <TaskBox key={index} task={task} debt={false}/>
                ))}

                </Box>

            </Box>
        )}
        </>
    )
}

export default VerticalTasksList;