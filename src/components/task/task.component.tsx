import { Badge, Td, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { taskStatusViews } from './task-status-views';
import useAdmin from '../../utils/use-admin.hook';
import { EDIT_TASK_PAGE_URL } from '../../contants';

import { Task as TaskData } from '../../declarations';

interface TaskProps {
  data: TaskData;
}

export const Task = ({ data }: TaskProps) => {
  const { email, username, text, status, isEditedByAdmin } = data;

  const taskStatusView = taskStatusViews[status];

  const navigate = useNavigate();

  const { admin } = useAdmin();

  const hoverStyle = { backgroundColor: admin ? 'gray.100' : '' };
  const cursor = admin ? 'pointer' : 'default';
  const onClick = admin
    ? () => navigate(EDIT_TASK_PAGE_URL.replace(':id', data.id))
    : () => {};

  return (
    <Tr _hover={hoverStyle} cursor={cursor} onClick={onClick}>
      <Td>{username}</Td>
      <Td>{email}</Td>
      <Td>
        <Badge colorScheme={taskStatusView.color}>{taskStatusView.text}</Badge>{' '}
        {isEditedByAdmin && (
          <Badge colorScheme="blue" marginLeft="1rem">
            Отредактировано администратором
          </Badge>
        )}
      </Td>
      <Td>{text}</Td>
    </Tr>
  );
};

export default Task;
