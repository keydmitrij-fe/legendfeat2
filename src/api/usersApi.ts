import { MetaResponse, User, UserFilters, UserRequest, UserRolesRequest } from "../types/usersTypes";
import { api } from "./api";

export async function getUsers(userFilters: UserFilters): Promise<MetaResponse<User>> {
    try {
        const response = await api.get('/admin/users', { params: userFilters })
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function getUserProfile(id: number): Promise<User> {
    try {
        const response = await api.get(`/admin/users/${id}`)
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function editUserProfile(id: number, editedUserData: UserRequest): Promise<User> {
    try {
        const response = await api.put(`/admin/users/${id}`, editedUserData)
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        await api.delete(`/admin/users/${id}`)
    } catch (error: unknown) {
        throw error;
    }
}

export async function blockUser(id: number): Promise<User> {
    try {
        const response = await api.post(`/admin/users/${id}/block`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function unblockUser(id: number): Promise<User> {
    try {
        const response = await api.post(`/admin/users/${id}/unblock`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function editUserProfileRights(id: number, roles: UserRolesRequest): Promise<User> {
    try {
        const response = await api.post(`/admin/users/${id}/rights`, roles)
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}