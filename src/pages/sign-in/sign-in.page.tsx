import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import useAdmin from '../../utils/use-admin.hook';
import useSignInPassword from './use-sign-in-password.hook';
import useSignInUsername from './use-sign-in-username.hook';
import useSignIn from './use-sign-in.hook';
import { MAIN_PAGE_URL } from '../../contants';

export const SignInPage = () => {
  const { username, onUsernameChange } = useSignInUsername();
  const { password, onPasswordChange } = useSignInPassword();

  const { isLoading, onSubmit } = useSignIn();

  const isFormValid = username.length && password.length;

  const { admin } = useAdmin();

  if (admin) {
    return <Navigate replace to={MAIN_PAGE_URL} />;
  }

  return (
    <Flex
      height="full"
      width="full"
      justifyContent="center"
      alignItems="center"
      padding="2rem"
    >
      <Box width="25rem" marginTop="10%">
        <FormControl isRequired>
          <FormLabel htmlFor="username">Имя пользователя</FormLabel>
          <Input id="username" value={username} onChange={onUsernameChange} />
        </FormControl>
        <FormControl isRequired marginY="1rem">
          <FormLabel htmlFor="password">Пароль</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="full"
          marginTop="1rem"
          isLoading={isLoading}
          isDisabled={!isFormValid}
          onClick={onSubmit}
        >
          Войти в аккаунт
        </Button>
      </Box>
    </Flex>
  );
};

export default SignInPage;
