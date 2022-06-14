import { TasksPageState } from './tasks-page.declarations';

export const tasksPageInitialState: TasksPageState = {
  tasks: [],
  totalTasks: 0,
  loading: 'idle',
  error: null,
  page: 1,

  sort: {
    username: 'desc',
    email: null,
    status: null,
  },
};
