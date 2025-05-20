import { api } from "./api";
import { MetaResponse, Todo, TodoInfo, TodoRequest } from "./interface";


export async function fetchTasks(status?: 'all' | 'completed' | 'inWork'): Promise<MetaResponse<Todo, TodoInfo> | unknown> {
    try {
        const response = await api.get('/todos', {
            params: {
                filter: status
            }
        })
        return response.data;
    } catch (error: unknown) {
        alert("Ошибка: " + error);
    }
}

export async function addTask(inputValue: string): Promise<Todo | unknown> {
    try {
        const response = await api.post('/todos', {
            title: inputValue,
            isDone: false,
        })
        return response.data;
    } catch (error: unknown) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksToDone(id: number, task: TodoRequest): Promise<Todo | unknown> {
    try {
        const response = await api.put(`/todos/${id}`, {
            isDone: task.isDone,
        });
        return response.data;
    } catch (error: unknown) {
        alert("Ошибка: " + error);
    }
}

export async function deleteTask(id: number): Promise<Todo | unknown> {
    try {
        const response = await api.delete(`/todos/${id}`);
        return response.data;
    } catch (error: unknown) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksName(id: number, task: TodoRequest): Promise<Todo | unknown> {
    try {
        const response = await api.put(`/todos/${id}`, {
            title: task.title,
        })
        return response;
    } catch (error: unknown) {
        alert("Ошибка: " + error);
    }
}