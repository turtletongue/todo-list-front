import { ChangeEvent } from 'react';

import {
  selectEmail,
  selectIsEmailValid,
  setEmail,
} from '../../store/add-task-page/add-task-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useTaskEmail = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectEmail);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const isEmailValid = useAppSelector(selectIsEmailValid);

  return {
    email,
    isEmailValid,
    onEmailChange,
  };
};

export default useTaskEmail;
