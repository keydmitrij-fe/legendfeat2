
import { AuthData, MetaResponse, Todo, TodoInfo, UserRegistration } from "./interface";
import axios from "axios";

const api = axios.create({
    baseURL: "https://easydev.club/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

export async function fetchTasks(status?: 'all' | 'completed' | 'inWork'): Promise<MetaResponse<Todo, TodoInfo> | any> {
    try {
        const response = await api.get('/todos', {
            params: {
                filter: status
            }
        })
        return response.data;
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function addTask(inputValue: string) {
    try {
        await api.post('/todos', {
            title: inputValue,
            isDone: false,
        })

    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksToDone(id: number, isDone: boolean) {
    try {
        await api.put(`/todos/${id}`, {
            isDone: isDone,
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function deleteTask(id: number) {
    try {
        await api.delete(`/todos/${id}`);
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksName(id: number, newTaskName: string) {
    try {
        await api.put(`/todos/${id}`, {
            title: newTaskName,
        })
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function registerUser(registerData: UserRegistration) {
    try {
        const response = await api.post('/auth/signup', registerData)
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function authUser(authData: AuthData) {
    try {
        const response = await api.post('/auth/signin', authData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function logoutUser() {
    try {
        api.post('/user/logout')
    } catch (error: any) {
        throw error;
    }
}

export async function updateAccessToken() {
    try {
        const response = await api.post('/auth/refresh', { refreshToken: localStorage.getItem('refreshToken') });
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
}

export const getUserProfile = async () => {
    try {
        const response = await api.get("/user/profile");
        return response.data;
    } catch (error: any) {
        throw error;
    }
};