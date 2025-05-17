import { redirect } from "react-router-dom";
import { RefreshToken } from "../api/interface";
import { AxiosPromise } from "axios";
import { updateAccessToken } from "../api/api";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";

export function removeTokens() {
    tokenUtil.removeAccessToken();
    localStorage.removeItem('refreshToken')
}

let refreshTokenRequest: AxiosPromise<RefreshToken> | null = null;

export async function refreshAccessToken() {
    try {
        if (refreshTokenRequest === null) {
            refreshTokenRequest = updateAccessToken();
        }
        const res = await refreshTokenRequest;
        refreshTokenRequest = null;
        return res.data;
    } catch (error: any) {
        if (error.response.status >= 500) {
            alert("Ошибка со стороны сервера, попробуйте позже.");
        }
    }
}

export async function checkIsAuth() {
    if (localStorage.getItem('refreshToken')) {
        try {
            if (refreshTokenRequest === null) {
                refreshTokenRequest = updateAccessToken();
            }
            const res = await refreshTokenRequest;
            refreshTokenRequest = null;
            return res.data;
        } catch (error: any) {
            if (error.response.status === 500) {
                alert("Ошибка со стороны сервера, попробуйте позже.");
                redirect('/auth');
            }
        }
    } else {
        redirect('/auth');
    }
}