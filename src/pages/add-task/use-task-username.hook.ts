import { ChangeEvent } from 'react';

import {
  selectIsUsernameValid,
  selectUsername,
  setUsername,
} from '../../store/add-task-page/add-task-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useTaskUsername = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  const isUsernameValid = useAppSelector(selectIsUsernameValid);

  return {
    username,
    isUsernameValid,
    onUsernameChange,
  };
};

export default useTaskUsername;
