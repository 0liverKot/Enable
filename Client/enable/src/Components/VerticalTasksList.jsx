import React, { useEffect, useState } from "react";
import { getTasksByUser } from "../api/taskMethods";
import { sortTasksByNextAppearance } from "../utils/sortTasksByNextAppearance";

const VerticalTasksList = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            const response = await getTasksByUser(2)
            setTasks(response.data)
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        sortTasksByNextAppearance(tasks)
        console.log(tasks);
    }, [tasks]);


    return (
        <>
            hello
        </>
    )
}

export default VerticalTasksList;