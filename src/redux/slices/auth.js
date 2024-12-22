import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

// Добавлен fetchAuth
export const fetchAuth = createAsyncThunk('auth/fetchAuth',
    async (params) => {
        const { data } = await axios.post('/auth/login', params);
        return data;
    });

export const getAuthMe = createAsyncThunk('auth/getAuthMe',
    async () => {
        const { data } = await axios.get('/auth/me');
        return data;
    });

export const requestRegistration = createAsyncThunk('auth/registration',
    async (params) => {
        const { data } = await axios.post('/auth/register', params);
        return data;
    });

// Начальное состояние
const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            state.data = null; // Логаут обнуляет данные
        }
    },

    extraReducers: {
        // Auth
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // Me
        [getAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [getAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [getAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // Registration
        [requestRegistration.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [requestRegistration.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [requestRegistration.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
