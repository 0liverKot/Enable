import { taskService } from "./apiService";

// api calls for task entity

export const getTasksByUser = (uid) => {
    return taskService.getTasksByUser(uid)
}


