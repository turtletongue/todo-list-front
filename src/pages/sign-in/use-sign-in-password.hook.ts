import { ChangeEvent } from 'react';

import {
  selectPassword,
  setPassword,
} from '../../store/sign-in-page/sign-in-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useSignInPassword = () => {
  const dispatch = useAppDispatch();

  const password = useAppSelector(selectPassword);

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  return { password, onPasswordChange };
};

export default useSignInPassword;
