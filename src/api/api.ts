
import { redirect } from "react-router-dom";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";
import { AuthData, MetaResponse, Todo, TodoInfo, UserRegistration } from "./interface";
import axios from "axios";
import store from "../store";
import { authActions } from "../store/AuthSlice";
import { removeTokens } from "../util/auth";

const api = axios.create({
    baseURL: "https://easydev.club/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    if (tokenUtil.getAccessToken()) {
        config.headers.Authorization = `Bearer ${tokenUtil.getAccessToken()}`
    }
    return config;
}, error => Promise.reject(error))

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (originalRequest.url.includes('/refresh')) {
            alert('Время сессии истекло, авторизуйтесь заново');
            store.dispatch(authActions.logout())
            removeTokens();
            redirect('/auth')
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                if (localStorage.getItem('refreshToken')) {
                    await updateAccessToken();
                }
                originalRequest.headers['Authorization'] = `Bearer ${tokenUtil.getAccessToken()}`;
                return api(originalRequest);
            } catch (error: any) {
                if (error.response.status === 401) {
                    store.dispatch(authActions.logout())
                    removeTokens();
                    redirect('/auth')
                    console.error('Время сессии истекло, авторизуйтесь заново');
                }
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

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
        tokenUtil.setAccessToken(response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken)
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
}

export async function getUserProfile() {
    try {
        const response = await api.get("/user/profile");
        return response.data;
    } catch (error: any) {
        throw error;
    }
};