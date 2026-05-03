import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types/authTypes";

const initialAuthState = { isAuth: false, isInitAuthEnded: false };
const initialProfileState: Profile = {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
    phoneNumber: ""
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuth = true
        },
        logout(state) {
            state.isAuth = false
        },
        setInitAuthEnded(state) {
            state.isInitAuthEnded = true
        }
    }
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {
        setProfileData(state: Profile, action: PayloadAction<Profile>) {
            return { ...action.payload }
        },
        clearProfileData() {
            return { ...initialProfileState }

        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
