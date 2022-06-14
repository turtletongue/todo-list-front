import { ChangeEvent } from 'react';

import {
  selectUsername,
  setUsername,
} from '../../store/sign-in-page/sign-in-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useSignInUsername = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  return { username, onUsernameChange };
};

export default useSignInUsername;
