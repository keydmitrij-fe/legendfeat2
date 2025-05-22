import { redirect } from "react-router-dom";
import { updateAccessToken } from "../api/authApi";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";
import axios from "axios";
import { notification } from "antd";

const showErrorNotification = (message: string, description?: string) => {
    notification.error({
        message,
        description,
        placement: "top",
    });
};

export function removeTokens() {
    tokenUtil.removeAccessToken();
    localStorage.removeItem('refreshToken')
}

export async function refreshAccessToken() {
    if (localStorage.getItem('refreshToken')) {
        try {
            const data = await updateAccessToken();
            tokenUtil.setAccessToken(data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 500) {
                    showErrorNotification('Ошибка', "Ошибка со стороны сервера, попробуйте позже.");
                    redirect('/auth');
                }
            }

        }
    } else if (!localStorage.getItem('refreshToken')) {
        redirect('/auth');
    }
}