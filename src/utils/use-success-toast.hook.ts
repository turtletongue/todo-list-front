import { useToast } from '@chakra-ui/react';

export const useSuccessToast = () => {
  const toast = useToast();

  const makeToast = (message: string) =>
    toast({
      title: message,
      position: 'bottom-right',
      status: 'success',
    });

  return makeToast;
};

export default useSuccessToast;
