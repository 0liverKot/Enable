import React, { useEffect, useState } from "react";
import { getTasksByUser } from "../api/taskMethods";
import { sortTasksByNextAppearance } from "../utils/sortTasksByNextAppearance";
import TaskBox from "./TaskBox";

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
            <>
            <TaskBox task={tasks[0]} debt={false}/>
            </>
        )}
        </>
    )
}

export default VerticalTasksList;