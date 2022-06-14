import { EditTaskPageState } from './edit-task-page.declarations';
import { TaskStatus } from '../../declarations';

export const editTaskPageInitialState: EditTaskPageState = {
  task: null,

  text: '',
  isTextValid: false,
  status: TaskStatus.inProgress,

  isUpdated: false,
  error: null,
};
