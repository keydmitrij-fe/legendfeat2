import { MetaResponse, Todo, TodoInfo } from "./interface";
import axios from "axios";

const apiUrl = 'https://easydev.club/api/v1/todos';

export async function fetchTasks(status?: 'all' | 'completed' | 'inWork'): Promise<MetaResponse<Todo, TodoInfo> | any> {
    try {
        const response = await axios.get(apiUrl + `?filter${status}`, {
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
        await axios.post(apiUrl, {
            title: inputValue,
            isDone: false,
        })

    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksToDone(id: number, isDone: boolean) {
    try {
        await axios.put(apiUrl + `/${id}`, {
            isDone: isDone,
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function deleteTask(id: number) {
    try {
        await axios.delete(apiUrl + `/${id}`);
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksName(id: number, newTaskName: string) {
    try {
        await axios.put(apiUrl + `/${id}`, {
            title: newTaskName,
        })
    } catch (error) {
        alert("Ошибка: " + error);
    }
}
