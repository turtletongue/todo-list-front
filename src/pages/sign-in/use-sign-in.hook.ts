import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearFormFields,
  clearSignInResult,
  selectIsLoading,
  selectIsLoggedIn,
  selectPassword,
  selectSignInError,
  selectUsername,
  signIn,
} from '../../store/sign-in-page/sign-in-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import useFailToast from '../../utils/use-fail-toast.hook';
import { MAIN_PAGE_URL } from '../../contants';

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(clearSignInResult());
      dispatch(clearFormFields());

      navigate(MAIN_PAGE_URL);
    }
  }, [dispatch, navigate, isLoggedIn]);

  const makeFailToast = useFailToast();

  const error = useAppSelector(selectSignInError);
  useEffect(() => {
    if (error) {
      makeFailToast(error);

      dispatch(clearSignInResult());
    }
  }, [dispatch, makeFailToast, error]);

  const username = useAppSelector(selectUsername);
  const password = useAppSelector(selectPassword);

  const onSubmit = () => {
    dispatch(signIn({ username, password }));
  };

  const isLoading = useAppSelector(selectIsLoading);

  return { isLoading, onSubmit };
};

export default useSignIn;
