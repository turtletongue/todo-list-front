import { useToast } from '@chakra-ui/react';

export const useFailToast = () => {
  const toast = useToast();

  const makeToast = (message: string) =>
    toast({
      title: message,
      position: 'bottom-right',
      status: 'error',
    });

  return makeToast;
};

export default useFailToast;
