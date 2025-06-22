import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../types/usersTypes"

const initialProfileState: User = {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
    phoneNumber: ""
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialProfileState,
    reducers: {
        setUserProfileData(state: User, action: PayloadAction<User>) {
            return { ...action.payload }
        },
        clearUserProfileData() {
            return { ...initialProfileState }

        }
    }
})

export const userActions = userProfileSlice.actions;
export const userReducer = userProfileSlice.reducer;