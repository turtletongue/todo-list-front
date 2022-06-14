export enum TaskStatus {
  inProgress = 'inProgress',
  done = 'done',
}

export interface Task {
  id: string;
  username: string;
  email: string;
  status: TaskStatus;
  text: string;
  isEditedByAdmin: boolean;
}

export interface Admin {
  id: string;
  username: string;
}
