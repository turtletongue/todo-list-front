import { ChangeEvent } from 'react';

import {
  selectStatus,
  setStatus,
} from '../../store/edit-task-page/edit-task-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { TaskStatus } from '../../declarations';

export const useIsTaskDone = () => {
  const dispatch = useAppDispatch();

  const isDone = useAppSelector(selectStatus) === TaskStatus.done;

  const onIsDoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setStatus(event.target.checked ? TaskStatus.done : TaskStatus.inProgress)
    );
  };

  return { isDone, onIsDoneChange };
};

export default useIsTaskDone;
