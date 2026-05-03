import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaResponse, Roles, User, UserFilters, UserRoles, UsersModal } from "../types/usersTypes";
const initialState: MetaResponse<User> = {
    data: [],
    meta: {
        totalAmount: 0,
        sortBy: "",
        sortOrder: "asc"
    }
}

const initialStateUsersModal: UsersModal = {
    modalType: null,
    selectedUserId: 0
}

const initialStateUsersFilters: UserFilters = {
    search: '',
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    limit: 20,
    offset: 0
}

const initialStateUserRoles: UserRoles = {
    availableRoles: null,
    newRoles: null
};

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
        setIsModalOpen(state: UsersModal, action: PayloadAction<UsersModal['modalType']>) {
            state.modalType = action.payload
        },
        setSelectedUserId(state: UsersModal, action: PayloadAction<UsersModal['selectedUserId']>) {
            state.selectedUserId = action.payload
        },
        resetModal() {
            return { ...initialStateUsersModal }
        }
    }
})

export const userFilters = createSlice({
    name: 'usersFilters',
    initialState: initialStateUsersFilters,
    reducers: {
        setFilterSearchUser(state: UserFilters, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setFilterOffset(state: UserFilters, action: PayloadAction<number>) {
            state.offset = action.payload
        },
        setSortBy(state: UserFilters, action: PayloadAction<string | undefined>) {
            state.sortBy = action.payload;
        },
        setSortOrder(state: UserFilters, action: PayloadAction<'asc' | 'desc' | undefined>) {
            state.sortOrder = action.payload;
        },
        setIsBlockFilter(state: UserFilters, action: PayloadAction<boolean | undefined>) {
            state.isBlocked = action.payload
        },
        resetFilters() {
            return { ...initialStateUsersFilters }
        }
    }
})

export const userRoles = createSlice({
    name: 'userRoles',
    initialState: initialStateUserRoles,
    reducers: {
        setAvailableUserRoles(state: UserRoles, action: PayloadAction<Roles[] | null>) {
            state.availableRoles = action.payload
        },
        setNewUserRoles(state: UserRoles, action: PayloadAction<Roles[] | null>) {
            state.newRoles = action.payload
        },
        resetRoles() {
            return { ...initialStateUserRoles }
        }
    }
})

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;

export const usersModalReducer = usersModalSlice.reducer;
export const usersModalActions = usersModalSlice.actions;

export const userFiltersReducer = userFilters.reducer;
export const userFiltersActions = userFilters.actions;

export const userRolesReducer = userRoles.reducer;
export const userRolesActions = userRoles.actions;