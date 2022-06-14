export interface AddTaskPageState {
  username: string;
  email: string;
  text: string;

  isUsernameValid: boolean;
  isEmailValid: boolean;
  isTextValid: boolean;

  isCreated: boolean;
  error: string | null;
}

export interface CreateTasksParams {
  username: string;
  email: string;
  text: string;
}
