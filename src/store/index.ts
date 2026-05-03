import { configureStore } from "@reduxjs/toolkit";
import { authReducer, profileReducer } from "./AuthSlice";
import { userFiltersReducer, userRolesReducer, usersModalReducer, usersReducer } from "./usersSlice";
import { userReducer } from "./adminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        users: usersReducer, userProfile: userReducer,
        usersModal: usersModalReducer,
        userFilters: userFiltersReducer,
        userRoles: userRolesReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;