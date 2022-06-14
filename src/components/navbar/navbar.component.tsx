import { Box, Button, Flex, useMediaQuery } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  ADD_TASK_PAGE_URL,
  MAIN_PAGE_URL,
  SIGN_IN_PAGE_URL,
} from '../../contants';
import useAuthentication from '../../utils/use-authentication.hook';

export const Navbar = () => {
  const navigate = useNavigate();

  const navigateToMainPage = () => navigate(MAIN_PAGE_URL);
  const navigateToAddTaskPage = () => navigate(ADD_TASK_PAGE_URL);
  const navigateToSignInPage = () => navigate(SIGN_IN_PAGE_URL);

  const location = useLocation();

  const addTaskPageIsCurrent = location.pathname === ADD_TASK_PAGE_URL;
  const signInPageIsCurrent = location.pathname === SIGN_IN_PAGE_URL;

  const [isLessThan920px] = useMediaQuery('(max-width: 920px)');
  const flexDirection = isLessThan920px ? 'column' : 'row';
  const mainButtonWidth = isLessThan920px ? 'full' : '';

  const { isAuthenticated, onSignOut } = useAuthentication();

  return (
    <Flex
      width="full"
      justifyContent="space-between"
      alignItems="center"
      padding="2rem 1rem"
      flexDirection={flexDirection}
    >
      <Button
        onClick={navigateToMainPage}
        marginBottom="1rem"
        width={mainButtonWidth}
      >
        Главная
      </Button>
      <Box>
        {!addTaskPageIsCurrent && (
          <Button colorScheme="green" onClick={navigateToAddTaskPage}>
            Добавить задачу
          </Button>
        )}
        {isAuthenticated ? (
          <Button colorScheme="red" marginLeft="1rem" onClick={onSignOut}>
            Выход
          </Button>
        ) : (
          !signInPageIsCurrent && (
            <Button
              colorScheme="blue"
              marginLeft="1rem"
              onClick={navigateToSignInPage}
            >
              Вход
            </Button>
          )
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
