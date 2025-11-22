import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userService = {
    addNewUser: (data) => api.post('/users', data),
    changeUserName: (id, data) => api.put(`/users/change/${id}`, data),
    getAllUsers: () => api.get('/users/getAll'),
    getUserById: (id) => api.get(`/users/${id}`),
    userExistsByEmail: (string) => api.get(`users/get/email/${string}`),
    deleteUser: (id) => api.delete(`/users/${id}`),
    deleteAllUsers: () => api.delete('/users/deleteAll')
}

export const taskService = {
    addNewTask: (data) => api.post('/tasks', data),
    updateTask: (id, uid, data) => api.put(`/tasks/${id}/${uid}`, data),
    getTaskById: (id) => api.get(`/tasks/${id}`),
    getAllTasks: () => api.get('/tasks/getAll'),
    getTaskByUser: (uid) => api.get(`/tasks/getAll/${uid}`),
    getTaskByDay: (day, uid) => api.get(`/tasks/getAll/${day}/${uid}`),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    deleteAllUsersTasks: (uid) => api.delete(`/tasks/deleteAll/${uid}`)
}

export const authService= {
    authRegister: (data) => api.post('/api/auth/register', data),
    authAuthenticate: (data) => api.post('/api/auth/authenticate', data)
}

export default api; 