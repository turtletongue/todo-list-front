import { ChangeEvent } from 'react';

import {
  selectIsTextValid,
  selectText,
  setText,
} from '../../store/add-task-page/add-task-page.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useTaskText = () => {
  const dispatch = useAppDispatch();

  const text = useAppSelector(selectText);

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(event.target.value));
  };

  const isTextValid = useAppSelector(selectIsTextValid);

  return {
    text,
    isTextValid,
    onTextChange,
  };
};

export default useTaskText;
