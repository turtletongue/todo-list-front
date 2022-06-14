import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import addTaskPageReducer from './add-task-page/add-task-page.slice';
import tasksPageReducer from './tasks-page/tasks-page.slice';
import signInPageReducer from './sign-in-page/sign-in-page.slice';
import editTaskPageReducer from './edit-task-page/edit-task-page.slice';
import coreReducer from './core/core.slice';

export const store = configureStore({
  reducer: {
    tasksPage: tasksPageReducer,
    addTaskPage: addTaskPageReducer,
    editTaskPage: editTaskPageReducer,
    signInPage: signInPageReducer,
    core: coreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
