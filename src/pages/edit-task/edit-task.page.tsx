import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import useAdmin from '../../utils/use-admin.hook';
import useTaskUpdater from './use-task-updater.hook';
import useIsTaskDone from './use-is-task-done.hook';
import useTaskText from './use-task-text.hook';
import { MAIN_PAGE_URL } from '../../contants';

export const EditTaskPage = () => {
  const params = useParams();

  const { text, isTextValid, onTextChange } = useTaskText();
  const { isDone, onIsDoneChange } = useIsTaskDone();

  const { onSubmit } = useTaskUpdater(params.id);

  const { admin } = useAdmin();

  if (!admin) {
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
        <FormControl isRequired isInvalid={!isTextValid}>
          <FormLabel htmlFor="text">Текст</FormLabel>
          <Textarea id="text" value={text} onChange={onTextChange} />
          {!isTextValid && (
            <FormErrorMessage>Текст обязателен к заполнению.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginTop="1rem">
          <FormLabel htmlFor="isDone"></FormLabel>
          <Checkbox isChecked={isDone} onChange={onIsDoneChange}>
            Пометить как выполненное
          </Checkbox>
        </FormControl>
        <Button
          colorScheme="green"
          width="full"
          marginTop="1rem"
          isDisabled={!isTextValid}
          onClick={onSubmit}
        >
          Сохранить
        </Button>
      </Box>
    </Flex>
  );
};

export default EditTaskPage;
