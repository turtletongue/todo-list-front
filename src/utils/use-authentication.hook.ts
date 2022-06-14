import { useEffect } from 'react';

import {
  authenticate,
  logOut,
  selectIsAuthenticated,
} from '../store/core/core.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(logOut());
  };

  return { isAuthenticated, onSignOut };
};

export default useAuthentication;
