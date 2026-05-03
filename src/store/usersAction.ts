import { createAsyncThunk } from "@reduxjs/toolkit";
import { MetaResponse, User, UserFilters, UserRequest, UserRolesRequest } from "../types/usersTypes";
import { blockUser, deleteUser, editUserProfile, editUserProfileRights, getUserProfile, getUsers, unblockUser } from "../api/usersApi";
import axios from "axios";

interface UserDataToEdit {
    id: number,
    data: UserRequest
}

interface UserRolesToEdit {
    id: number,
    roles: UserRolesRequest
}

export const getUsersData = createAsyncThunk<
    MetaResponse<User>,
    UserFilters,
    { rejectValue: { status: number, message: string } }
>('admin/users', async (userFilters, thunkAPI) => {
    try {
        const usersData = await getUsers(userFilters);
        return usersData;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const getUserData = createAsyncThunk<
    User,
    number,
    { rejectValue: { status: number, message: string } }
>('admin/users/getProfile', async (id, thunkAPI) => {
    try {
        const userData = await getUserProfile(id);
        return userData;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const editUserData = createAsyncThunk<
    User,
    UserDataToEdit,
    { rejectValue: { status: number, message: string } }
>('admin/users/editProfile', async ({ id, data }, thunkAPI) => {
    try {
        const userData = await editUserProfile(id, data);
        return userData;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const deleteUserProfile = createAsyncThunk<
    void,
    number,
    { rejectValue: { status: number, message: string } }
>('admin/users/deleteUser', async (id, thunkAPI) => {
    try {
        await deleteUser(id);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const blockUserProfile = createAsyncThunk<
    User,
    number,
    { rejectValue: { status: number, message: string } }
>('admin/users/blockUser', async (id, thunkAPI) => {
    try {
        const response = await blockUser(id);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const unblockUserProfile = createAsyncThunk<
    User,
    number,
    { rejectValue: { status: number, message: string } }
>('admin/users/unblockUser', async (id, thunkAPI) => {
    try {
        const response = await unblockUser(id);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})

export const editUserRoles = createAsyncThunk<
    User,
    UserRolesToEdit,
    { rejectValue: { status: number, message: string } }
>('admin/users/editUserRoles', async ({ id, roles }, thunkAPI) => {
    try {
        const userData = await editUserProfileRights(id, roles);
        return userData;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue({ status: error.response.status, message: error.response.data.message })
        }
        return thunkAPI.rejectWithValue({ status: 0, message: 'Неизвестная ошибка получения профиля' })
    }
})