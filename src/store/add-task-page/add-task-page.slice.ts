import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { addTaskPageInitialState } from './add-task-page.initial-state';
import { fetchWithErrorHandling } from '../../utils/fetch-with-error-handling';
import { isEmailValid } from '../../utils/is-email-valid';
import { api } from '../../api';

import {
  AddTaskPageState,
  CreateTasksParams,
} from './add-task-page.declarations';
import { RootState } from '../store';

export const createTask = createAsyncThunk(
  'addTaskPage/createTask',
  async (task: CreateTasksParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      const createResponse = await axios.post(api.tasks, task);

      return createResponse.data;
    }, rejectWithValue);
  }
);

export const addTaskPageSlice = createSlice({
  name: 'addTaskPage',
  initialState: addTaskPageInitialState,
  reducers: {
    setEmail: (state: AddTaskPageState, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isEmailValid = isEmailValid(state.email);
    },
    setUsername: (state: AddTaskPageState, action: PayloadAction<string>) => {
      const username = action.payload;

      state.username = username;
      state.isUsernameValid = username.length > 0;
    },
    setText: (state: AddTaskPageState, action: PayloadAction<string>) => {
      const text = action.payload;

      state.text = text;
      state.isTextValid = text.length > 0;
    },
    clearCreationResult: (state: AddTaskPageState) => {
      state.isCreated = false;
      state.error = null;
    },
    clearFormFields: (state: AddTaskPageState) => {
      state.email = '';
      state.isEmailValid = false;

      state.username = '';
      state.isUsernameValid = false;

      state.text = '';
      state.isTextValid = false;
    },
  },
  extraReducers: {
    [createTask.pending as any]: (state) => {
      state.error = null;
    },
    [createTask.fulfilled as any]: (state) => {
      state.isCreated = true;
    },
    [createTask.rejected as any]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setEmail,
  setUsername,
  setText,
  clearCreationResult,
  clearFormFields,
} = addTaskPageSlice.actions;

export const selectEmail = (state: RootState) => state.addTaskPage.email;
export const selectIsEmailValid = (store: RootState) =>
  store.addTaskPage.isEmailValid;
export const selectUsername = (state: RootState) => state.addTaskPage.username;
export const selectIsUsernameValid = (state: RootState) =>
  state.addTaskPage.isUsernameValid;
export const selectText = (state: RootState) => state.addTaskPage.text;
export const selectIsTextValid = (state: RootState) =>
  state.addTaskPage.isTextValid;
export const selectIsCreated = (state: RootState) =>
  state.addTaskPage.isCreated;
export const selectCreationError = (state: RootState) =>
  state.addTaskPage.error;

export default addTaskPageSlice.reducer;
