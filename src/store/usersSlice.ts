import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaResponse, User } from "../types/usersTypes";
const initialState: MetaResponse<User> = {
    data: [],
    meta: {
        totalAmount: 0,
        sortBy: "",
        sortOrder: "asc"
    }
}
interface UsersModal {
    isModalOpen: "delete" | "block" | "unblock" | "addRoles" | "deleteRoles" | null,
    selectedUserId: number,
}
const initialStateUsersModal: UsersModal = {
    isModalOpen: null,
    selectedUserId: 0
}
export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsersData(state: MetaResponse<User>, action: PayloadAction<MetaResponse<User>>) {
            return { ...action.payload }
        },
        clearUsersData() {
            return { ...initialState }
        }
    }
})

export const usersModalSlice = createSlice({
    name: 'usersModal',
    initialState: initialStateUsersModal,
    reducers: {
        setIsModalOpen(state: UsersModal, action: PayloadAction<UsersModal['isModalOpen']>) {
            state.isModalOpen = action.payload
        },
        setSelectedUserId(state: UsersModal, action: PayloadAction<UsersModal['selectedUserId']>) {
            state.selectedUserId = action.payload
        },
        resetModal() {
            return { ...initialStateUsersModal }
        }
    }
})

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
export const usersModalReducer = usersModalSlice.reducer;
export const usersModalActions = usersModalSlice.actions;