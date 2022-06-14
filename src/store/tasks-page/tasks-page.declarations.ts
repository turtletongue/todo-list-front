import { Task } from '../../declarations';

type OptionalOrder = 'asc' | 'desc' | null;

export interface TasksSort {
  username: OptionalOrder;
  email: OptionalOrder;
  status: OptionalOrder;
}

export interface TasksPageState {
  tasks: Task[];
  totalTasks: number;
  loading: 'idle' | 'pending';
  error: string | null;

  sort: TasksSort;

  page: number;
}

export interface FetchTasksParams {
  page: number;
  sortField: string;
  sortDirection: string;
}

export type TasksResponse = { totalItems: number; items: Task[] };
