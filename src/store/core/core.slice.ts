import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchWithErrorHandling } from '../../utils/fetch-with-error-handling';
import { coreInitialState } from './core.initial-state';
import { NOT_AUTHENTICATED } from '../../error-messages';
import { api } from '../../api';

import { CoreState } from './core.declarations';
import { Admin } from '../../declarations';
import { RootState } from '../store';

export const logOut = createAsyncThunk(
  'core/logOut',
  async (_, { rejectWithValue, dispatch }) => {
    return await fetchWithErrorHandling(
      async () => {
        const logOutResponse = await axios.post(
          api.logOut,
          {},
          { withCredentials: true }
        );

        return logOutResponse.data;
      },
      rejectWithValue,
      (errorMessage: string) => {
        if (errorMessage === NOT_AUTHENTICATED) {
          dispatch(clearCore());
        }
      }
    );
  }
);

export const authenticate = createAsyncThunk(
  'core/authenticate',
  async (_, { rejectWithValue, dispatch }) => {
    return await fetchWithErrorHandling(
      async () => {
        const authenticateResponse = await axios.post(
          api.authenticate,
          {},
          { withCredentials: true }
        );

        return authenticateResponse.data;
      },
      rejectWithValue,
      (errorMessage: string) => {
        if (errorMessage === NOT_AUTHENTICATED) {
          dispatch(clearCore());
        }
      }
    );
  }
);

export const coreSlice = createSlice({
  name: 'core',
  initialState: coreInitialState,
  reducers: {
    clearCore: (state: CoreState) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [logOut.fulfilled as any]: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
    [authenticate.fulfilled as any]: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { clearCore } = coreSlice.actions;

export const selectAdmin = (state: RootState) => state.core.admin;
export const selectIsAuthenticated = (state: RootState) =>
  state.core.isAuthenticated;

export default coreSlice.reducer;
