import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectSortOrder,
  toggleOrder,
} from '../../store/tasks-page/tasks-page.slice';

export const useTasksSorting = () => {
  const dispatch = useAppDispatch();

  const sortOrder = useAppSelector(selectSortOrder);

  const onSortChange = (field: 'email' | 'username' | 'status') => () => {
    dispatch(toggleOrder(field));
  };

  return { sortOrder, onSortChange };
};
