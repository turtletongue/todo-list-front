import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchWithErrorHandling } from '../../utils/fetch-with-error-handling';
import { editTaskPageInitialState } from './edit-task-page.initial-state';
import { api } from '../../api';

import {
  EditTaskPageState,
  FetchTaskByIdParams,
  UpdateTaskParams,
} from './edit-task-page.declarations';
import { clearCore } from '../core/core.slice';
import { removeDuplicateValues } from '../../utils/remove-duplicate-values';
import { NOT_AUTHENTICATED } from '../../error-messages';

import { Task, TaskStatus } from '../../declarations';
import { RootState } from '../store';

export const fetchTaskById = createAsyncThunk(
  'editTaskPage/fetchTaskById',
  async ({ id }: FetchTaskByIdParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      const taskResponse = await axios.get(`${api.tasks}/${id}`, {});

      return taskResponse.data;
    }, rejectWithValue);
  }
);

export const updateTask = createAsyncThunk(
  'editTaskPage/updateTask',
  async (
    { updatedTask, task }: UpdateTaskParams,
    { rejectWithValue, dispatch }
  ) => {
    return await fetchWithErrorHandling(
      async () => {
        const updateResponse = await axios.patch(
          `${api.tasks}/${task.id}`,
          removeDuplicateValues(updatedTask, task),
          { withCredentials: true }
        );

        return updateResponse.data;
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

export const editTaskPageSlice = createSlice({
  name: 'editTaskPage',
  initialState: editTaskPageInitialState,
  reducers: {
    setText: (state: EditTaskPageState, action: PayloadAction<string>) => {
      const text = action.payload;

      state.text = text;
      state.isTextValid = text.length > 0;
    },
    setStatus: (
      state: EditTaskPageState,
      action: PayloadAction<TaskStatus>
    ) => {
      state.status = action.payload;
    },
    clearUpdateResult: (state: EditTaskPageState) => {
      state.isUpdated = false;
      state.error = null;
    },
    clearFormFields: (state: EditTaskPageState) => {
      state.task = null;

      state.text = '';
      state.isTextValid = false;
      state.status = TaskStatus.inProgress;
    },
  },
  extraReducers: {
    [fetchTaskById.pending as any]: (state) => {
      state.error = null;
    },
    [fetchTaskById.fulfilled as any]: (state, action: PayloadAction<Task>) => {
      const task = action.payload;

      state.task = task;
      state.text = task.text;
      state.isTextValid = task.text.length > 0;
      state.status = task.status;
    },
    [fetchTaskById.rejected as any]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [updateTask.pending as any]: (state) => {
      state.error = null;
    },
    [updateTask.fulfilled as any]: (state) => {
      state.isUpdated = true;
    },
    [updateTask.rejected as any]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setText, clearFormFields, clearUpdateResult } =
  editTaskPageSlice.actions;

export const selectStatus = (state: RootState) => state.editTaskPage.status;
export const selectText = (state: RootState) => state.editTaskPage.text;
export const selectIsTextValid = (state: RootState) =>
  state.editTaskPage.isTextValid;
export const selectIsUpdated = (state: RootState) =>
  state.editTaskPage.isUpdated;
export const selectUpdateTaskError = (state: RootState) =>
  state.editTaskPage.error;
export const selectTask = (state: RootState) => state.editTaskPage.task;

export default editTaskPageSlice.reducer;
