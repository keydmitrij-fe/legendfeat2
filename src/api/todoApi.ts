import { notification } from "antd";
import { api } from "./api";
import {
  Filter,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/todoTypes";
import { AxiosError, AxiosResponse } from "axios";

const showErrorNotification = (message: string, description?: string) => {
  notification.error({
    message,
    description,
    placement: "top",
  });
};

export async function fetchTasks(
  status?: Filter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response: AxiosResponse = await api.get("/todos", {
      params: {
        filter: status,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function addTask(inputValue: string): Promise<Todo | unknown> {
  try {
    const response = await api.post("/todos", {
      title: inputValue,
      isDone: false,
    });
    return response.data;
  } catch (error: unknown) {
    showErrorNotification("Ошибка: ", `${error}`);
  }
}

export async function fetchEditTasksToDone(
  id: number,
  task: TodoRequest,
): Promise<Todo | unknown> {
  try {
    const response = await api.put(`/todos/${id}`, {
      isDone: task.isDone,
    });
    return response.data;
  } catch (error: unknown) {
    showErrorNotification("Ошибка: ", `${error}`);
  }
}

export async function deleteTask(id: number): Promise<Todo | unknown> {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error: unknown) {
    showErrorNotification("Ошибка: ", `${error}`);
  }
}

export async function fetchEditTasksName(
  id: number,
  task: TodoRequest,
): Promise<Todo | unknown> {
  try {
    const response = await api.put(`/todos/${id}`, {
      title: task.title,
    });
    return response;
  } catch (error: unknown) {
    showErrorNotification("Ошибка: ", `${error}`);
  }
}
