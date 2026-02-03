import React, { useEffect, useState } from "react";
import { getTasksByUser } from "../api/taskMethods";
import { sortTasksByNextAppearance } from "../utils/sortTasksByNextAppearance";
import TaskBox from "./TaskBox";
import { Box, Paper, Typography } from "@mui/material";

const VerticalTasksList = ({type}) => {

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


    var headingText;
    var debt;
    if(type === "debt") {
        headingText = "Task Debt : "
        debt = true
    } else {
        headingText = "Tasks Due : "
        debt = false
    }

    return (
        <>
        {tasks.length !== 0 && (
            <Box
            sx={{
                bgcolor: "primary.secondary",
                opacity: 0.8,
                borderRadius: 10,
                height: "100%",
                padding: 2,
                justifyContent: "center"
            }}> 
                <Typography
                variant="h5"
                sx={{
                    padding: 2
                }}>
                    {headingText}
                </Typography>
                <Box 
                sx={{
                    height: "92%",
                    padding: 2,
                    overflowY: "scroll",
                    '&::-webkit-scrollbar': {
                        scrollbarWidth: "none"
                    }, 
                }}>
                {tasks.map((task, index) => (
                    <TaskBox key={index} task={task} debt={debt}/>
                ))}

                </Box>

            </Box>
        )}
        </>
    )
}

export default VerticalTasksList;