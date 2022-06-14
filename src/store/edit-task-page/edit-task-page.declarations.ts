import { Task, TaskStatus } from '../../declarations';

export interface EditTaskPageState {
  task: Task | null;

  text: string;
  isTextValid: boolean;
  status: TaskStatus;

  isUpdated: boolean;
  error: string | null;
}

export interface FetchTaskByIdParams {
  id: string;
}

export interface UpdateTaskParams {
  updatedTask: {
    text: string;
    status: TaskStatus;
  };
  task: Task;
}
