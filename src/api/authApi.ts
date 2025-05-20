import { api } from "./api";
import { AuthData, Profile, RefreshToken, Token, UserRegistration } from "./interface";

export async function registerUser(registerData: UserRegistration): Promise<Profile> {
    try {
        const response = await api.post('/auth/signup', registerData)
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function authUser(authData: AuthData): Promise<Token> {
    try {
        const response = await api.post('/auth/signin', authData);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function logoutUser() {
    try {
        api.post('/user/logout')
    } catch (error: unknown) {
        throw error;
    }
}

export async function updateAccessToken(): Promise<Token> {
    const refreshToken: RefreshToken = {
        refreshToken: localStorage.getItem('refreshToken')
    }
    try {
        const response = await api.post('/auth/refresh', refreshToken);
        return response.data;
    }
    catch (error: unknown) {
        throw error;
    }
}

export async function getUserProfile(): Promise<Profile> {
    try {
        const response = await api.get("/user/profile");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};