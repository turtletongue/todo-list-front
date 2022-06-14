import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

import useTaskEmail from './use-task-email.hook';
import useTaskText from './use-task-text.hook';
import useTaskUsername from './use-task-username.hook';
import useTaskCreator from './use-task-creator.hook';

export const AddTaskPage = () => {
  const { email, isEmailValid, onEmailChange } = useTaskEmail();
  const { username, isUsernameValid, onUsernameChange } = useTaskUsername();
  const { text, isTextValid, onTextChange } = useTaskText();

  const { onSumbit } = useTaskCreator();

  const isFormValid = isEmailValid && isUsernameValid && isTextValid;

  return (
    <Flex
      height="full"
      width="full"
      justifyContent="center"
      alignItems="center"
      padding="2rem"
    >
      <Box width="25rem" marginTop="10%">
        <FormControl isRequired isInvalid={!isUsernameValid}>
          <FormLabel htmlFor="username">Имя пользователя</FormLabel>
          <Input
            id="username"
            placeholder="bob"
            value={username}
            onChange={onUsernameChange}
          />
          {!isUsernameValid && (
            <FormErrorMessage>
              Имя пользователя обязательно к заполнению.
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired marginY="1rem" isInvalid={!isEmailValid}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="bob@gmail.com"
            value={email}
            onChange={onEmailChange}
          />
          {!isEmailValid && (
            <FormErrorMessage>Некорректный email.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={!isTextValid}>
          <FormLabel htmlFor="text">Текст</FormLabel>
          <Textarea
            id="text"
            placeholder="Покормить кота"
            value={text}
            onChange={onTextChange}
          />
          {!isTextValid && (
            <FormErrorMessage>Текст обязателен к заполнению.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme="green"
          width="full"
          marginTop="1rem"
          disabled={!isFormValid}
          onClick={onSumbit}
        >
          Сохранить
        </Button>
      </Box>
    </Flex>
  );
};

export default AddTaskPage;
