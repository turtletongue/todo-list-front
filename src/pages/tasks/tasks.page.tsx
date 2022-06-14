import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import Task from '../../components/task/task.component';
import Pagination from '../../components/pagination/pagination.component';
import SortableTableHead from '../../components/sortable-table-head/sortable-table-head';
import { useTasksSorting } from './use-tasks-sorting.hook';
import useTasks from './use-tasks.hook';

export const TasksPage = () => {
  const { sortOrder, onSortChange } = useTasksSorting();

  const { page, tasks, totalTasks, onPageChange } = useTasks();

  return (
    <Flex alignItems="center" flexDirection="column" paddingY="2rem">
      <TableContainer width="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <SortableTableHead
                order={sortOrder.username}
                toggleOrder={onSortChange('username')}
              >
                Имя пользователя
              </SortableTableHead>
              <SortableTableHead
                order={sortOrder.email}
                toggleOrder={onSortChange('email')}
              >
                E-mail
              </SortableTableHead>
              <SortableTableHead
                order={sortOrder.status}
                toggleOrder={onSortChange('status')}
              >
                Статус
              </SortableTableHead>
              <Th>Текст</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Task data={task} key={task.id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box marginTop="2rem">
        <Pagination
          pageNumber={page}
          total={totalTasks}
          setPage={onPageChange}
        />
      </Box>
    </Flex>
  );
};

export default TasksPage;
