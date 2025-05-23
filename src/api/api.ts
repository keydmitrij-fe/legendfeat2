import { redirect } from "react-router-dom";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";
import axios from "axios";
import store from "../store";
import { authActions } from "../store/AuthSlice";
import { updateAccessToken } from "./authApi";
import { notification } from "antd";
import { removeTokens } from "../store/authAction";

export const api = axios.create({
    baseURL: "https://easydev.club/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
})

const showErrorNotification = (message: string, description?: string) => {
    notification.error({
        message,
        description,
        placement: "top",
    });
};

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
            showErrorNotification('Ошибка', 'Время сессии истекло, авторизуйтесь заново');
            store.dispatch(authActions.logout())
            removeTokens();
            redirect('/auth')
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                if (localStorage.getItem('refreshToken')) {
                    const data = await updateAccessToken();
                    tokenUtil.setAccessToken(data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken)
                }
                originalRequest.headers['Authorization'] = `Bearer ${tokenUtil.getAccessToken()}`;
                return api(originalRequest);
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    store.dispatch(authActions.logout())
                    removeTokens();
                    redirect('/auth')
                    showErrorNotification('Ошибка', 'Время сессии истекло, авторизуйтесь заново');
                }
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);



