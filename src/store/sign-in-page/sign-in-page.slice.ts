import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { signInPageInitialState } from './sign-in-page.initial-state';
import { fetchWithErrorHandling } from '../../utils/fetch-with-error-handling';
import { authenticate } from '../core/core.slice';
import { api } from '../../api';

import { SignInPageState, SignInParams } from './sign-in-page.declarations';
import { RootState } from '../store';

export const signIn = createAsyncThunk(
  'signInPage/signIn',
  async (credentials: SignInParams, { rejectWithValue, dispatch }) => {
    return await fetchWithErrorHandling(async () => {
      const signInResponse = await axios.post(api.signIn, credentials, {
        withCredentials: true,
      });

      dispatch(authenticate());

      return signInResponse.data;
    }, rejectWithValue);
  }
);

export const signInSlice = createSlice({
  name: 'signInPage',
  initialState: signInPageInitialState,
  reducers: {
    setUsername: (state: SignInPageState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state: SignInPageState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearSignInResult: (state: SignInPageState) => {
      state.isLoggedIn = false;
      state.error = null;
    },
    clearFormFields: (state: SignInPageState) => {
      state.username = '';
      state.password = '';
    },
  },
  extraReducers: {
    [signIn.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = null;
    },
    [signIn.fulfilled as any]: (state) => {
      state.loading = 'idle';
      state.isLoggedIn = true;
    },
    [signIn.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setUsername, setPassword, clearFormFields, clearSignInResult } =
  signInSlice.actions;

export const selectUsername = (state: RootState) => state.signInPage.username;
export const selectPassword = (state: RootState) => state.signInPage.password;
export const selectIsLoading = (state: RootState) =>
  state.signInPage.loading === 'pending';
export const selectIsLoggedIn = (state: RootState) =>
  state.signInPage.isLoggedIn;
export const selectSignInError = (state: RootState) => state.signInPage.error;

export default signInSlice.reducer;
