import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearCreationResult,
  clearFormFields,
  createTask,
  selectCreationError,
  selectEmail,
  selectIsCreated,
  selectText,
  selectUsername,
} from '../../store/add-task-page/add-task-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import useFailToast from '../../utils/use-fail-toast.hook';
import useSuccessToast from '../../utils/use-success-toast.hook';
import { MAIN_PAGE_URL } from '../../contants';

export const useTaskCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const makeSuccessToast = useSuccessToast();

  const isCreated = useAppSelector(selectIsCreated);
  useEffect(() => {
    if (isCreated) {
      dispatch(clearCreationResult());
      dispatch(clearFormFields());

      makeSuccessToast('Задача создана успешно');

      navigate(MAIN_PAGE_URL);
    }
  }, [dispatch, navigate, makeSuccessToast, isCreated]);

  const makeFailToast = useFailToast();

  const error = useAppSelector(selectCreationError);
  useEffect(() => {
    if (error) {
      makeFailToast(error);

      dispatch(clearCreationResult());
    }
  }, [dispatch, makeFailToast, error]);

  const email = useAppSelector(selectEmail);
  const username = useAppSelector(selectUsername);
  const text = useAppSelector(selectText);

  const onSumbit = () => {
    dispatch(createTask({ email, username, text }));
  };

  return { onSumbit };
};

export default useTaskCreator;
