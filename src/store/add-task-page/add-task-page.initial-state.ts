import { AddTaskPageState } from './add-task-page.declarations';

export const addTaskPageInitialState: AddTaskPageState = {
  username: '',
  email: '',
  text: '',

  isUsernameValid: false,
  isEmailValid: false,
  isTextValid: false,

  isCreated: false,
  error: null,
};
