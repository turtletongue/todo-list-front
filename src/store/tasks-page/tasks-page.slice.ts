import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksPageInitialState } from './tasks-page.initial-state';
import { fetchWithErrorHandling } from '../../utils/fetch-with-error-handling';
import { DEFAULT_FETCH_LIMIT } from '../../contants';
import { RootState } from '../store';
import { api } from '../../api';

import {
  FetchTasksParams,
  TasksPageState,
  TasksResponse,
  TasksSort,
} from './tasks-page.declarations';

export const fetchTasks = createAsyncThunk(
  'tasksPage/fetchTasks',
  async (
    { page, sortDirection, sortField }: FetchTasksParams,
    { rejectWithValue }
  ) => {
    return await fetchWithErrorHandling(async () => {
      const limit = DEFAULT_FETCH_LIMIT;
      const skip = page * limit - limit;

      const tasksResponse: TasksResponse = (
        await axios.get(api.tasks, {
          params: {
            sortDirection,
            sortField,
            limit,
            skip,
          },
        })
      ).data;

      return tasksResponse;
    }, rejectWithValue);
  }
);

export const tasksPageSlice = createSlice({
  name: 'tasksPage',
  initialState: tasksPageInitialState,
  reducers: {
    setPage: (state: TasksPageState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    toggleOrder: (
      state: TasksPageState,
      action: PayloadAction<'username' | 'email' | 'status'>
    ) => {
      const changedOrder = state.sort[action.payload];

      const otherOrders = Object.fromEntries(
        Object.entries(state.sort)
          .filter(([key]) => key !== action.payload)
          .map(([key]) => [key, null])
      ) as unknown as TasksSort;

      state.sort = {
        ...otherOrders,
        [action.payload]: changedOrder === 'asc' ? 'desc' : 'asc',
      };
    },
  },
  extraReducers: {
    [fetchTasks.pending as any]: (state) => {
      state.error = null;
      state.loading = 'pending';
    },
    [fetchTasks.fulfilled as any]: (
      state,
      { payload: { totalItems, items } }: PayloadAction<TasksResponse>
    ) => {
      state.loading = 'idle';
      state.totalTasks = totalItems;
      state.tasks = items;
    },
    [fetchTasks.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setPage, toggleOrder } = tasksPageSlice.actions;

export const selectTasks = (state: RootState) => state.tasksPage.tasks;
export const selectPage = (state: RootState) => state.tasksPage.page;
export const selectTotalTasks = (state: RootState) =>
  state.tasksPage.totalTasks;
export const selectIsLoading = (state: RootState) =>
  state.tasksPage.loading === 'pending';
export const selectSortOrder = (state: RootState) => state.tasksPage.sort;

export default tasksPageSlice.reducer;
