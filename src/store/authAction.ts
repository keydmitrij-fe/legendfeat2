import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData, Profile, RefreshToken, Token } from "../api/interface";
import { authUser, getUserProfile, updateAccessToken } from "../api/authApi";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";
import axios from "axios";

export const login = createAsyncThunk<
    Token,
    AuthData,
    { rejectValue: { status: number, message: string } }
>('auth/login', async (authData, thunkAPI) => {
    try {
        const tokens = await authUser(authData);
        tokenUtil.setAccessToken(tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        return tokens;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка авторизации' })
    }
});

export const refreshToken = createAsyncThunk<
    Token,
    void,
    { rejectValue: { status: number, message: string } }
>('refresh', async (_, thunkAPI) => {
    const refreshToken: RefreshToken = { refreshToken: localStorage.getItem('refreshToken') };
    if (!refreshToken) {
        return thunkAPI.rejectWithValue({
            status: 401,
            message: 'Отсутствует рефреш токен',
        });
    }
    try {
        const tokens = await updateAccessToken();
        tokenUtil.setAccessToken(tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken)
        return tokens;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка обновления токена' })
    }
});

export const getProfile = createAsyncThunk<
    Profile,
    void,
    { rejectValue: { status: number, message: string } }
>('getProfile', async (_, thunkAPI) => {
    try {
        const resData = await getUserProfile();
        return resData;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export function removeTokens() {
    tokenUtil.removeAccessToken();
    localStorage.removeItem('refreshToken')
}
