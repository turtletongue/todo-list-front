import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  fetchTasks,
  selectIsLoading,
  selectPage,
  selectSortOrder,
  selectTasks,
  selectTotalTasks,
  setPage,
} from '../../store/tasks-page/tasks-page.slice';

export const useTasks = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectTasks);
  const page = useAppSelector(selectPage);
  const totalTasks = useAppSelector(selectTotalTasks);
  const isLoading = useAppSelector(selectIsLoading);

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const sortOrder = useAppSelector(selectSortOrder);
  const memoizedSortOrder = useMemo(
    () => ({
      email: sortOrder.email,
      username: sortOrder.username,
      status: sortOrder.status,
    }),
    [sortOrder.email, sortOrder.username, sortOrder.status]
  );

  useEffect(() => {
    const [sortField, sortDirection] = Object.entries(memoizedSortOrder).find(
      ([, direction]) => direction !== null
    ) || ['username', 'desc'];

    dispatch(
      fetchTasks({ page, sortDirection: sortDirection as string, sortField })
    );
  }, [dispatch, page, memoizedSortOrder]);

  return { tasks, page, totalTasks, isLoading, onPageChange };
};

export default useTasks;
