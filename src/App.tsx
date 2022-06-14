import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Navbar from './components/navbar/navbar.component';
import TasksPage from './pages/tasks/tasks.page';
import AddTaskPage from './pages/add-task/add-task.page';
import SignInPage from './pages/sign-in/sign-in.page';
import {
  ADD_TASK_PAGE_URL,
  EDIT_TASK_PAGE_URL,
  MAIN_PAGE_URL,
  SIGN_IN_PAGE_URL,
} from './contants';
import EditTaskPage from './pages/edit-task/edit-task.page';

const App = () => {
  return (
    <Box width="full" height="full">
      <Navbar />
      <Routes>
        <Route path={MAIN_PAGE_URL} element={<TasksPage />} />
        <Route path={ADD_TASK_PAGE_URL} element={<AddTaskPage />} />
        <Route path={EDIT_TASK_PAGE_URL} element={<EditTaskPage />} />
        <Route path={SIGN_IN_PAGE_URL} element={<SignInPage />} />
      </Routes>
    </Box>
  );
};

export default App;
