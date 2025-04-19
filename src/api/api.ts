
import { MetaResponse, Todo, TodoInfo } from "./interface";
import axios from "axios";

const api = axios.create({
    baseURL: "https://easydev.club/api/v1",
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
