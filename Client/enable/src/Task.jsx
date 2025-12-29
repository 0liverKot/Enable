import React from "react";
import { useSearchParams } from "react-router";

const Task = () => {

    let [searchParams] = useSearchParams();
    const taskId = searchParams.get("id")

    return (
        <>
        {taskId}
        </>
    )
}

export default Task;