import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  selectText,
  selectStatus,
  updateTask,
  selectIsUpdated,
  clearUpdateResult,
  clearFormFields,
  selectUpdateTaskError,
  fetchTaskById,
  selectTask,
} from '../../store/edit-task-page/edit-task-page.slice';
import useSuccessToast from '../../utils/use-success-toast.hook';
import useFailToast from '../../utils/use-fail-toast.hook';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MAIN_PAGE_URL } from '../../contants';

export const useTaskUpdater = (taskId?: string) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const task = useAppSelector(selectTask);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById({ id: taskId }));
    }
  }, [dispatch, taskId]);

  const makeSuccessToast = useSuccessToast();

  const isUpdated = useAppSelector(selectIsUpdated);
  useEffect(() => {
    if (isUpdated) {
      makeSuccessToast('Задача успешно обновлена');

      dispatch(clearUpdateResult());
      dispatch(clearFormFields());

      navigate(MAIN_PAGE_URL);
    }
  }, [dispatch, navigate, makeSuccessToast, isUpdated]);

  const makeFailToast = useFailToast();

  const error = useAppSelector(selectUpdateTaskError);
  useEffect(() => {
    if (error) {
      makeFailToast(error);

      dispatch(clearUpdateResult);
    }
  }, [dispatch, makeFailToast, error]);

  const text = useAppSelector(selectText);
  const status = useAppSelector(selectStatus);

  const onSubmit = () => {
    if (task) {
      dispatch(updateTask({ updatedTask: { text, status }, task }));
    }
  };

  return { onSubmit };
};

export default useTaskUpdater;
