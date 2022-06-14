import { Box, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PaginationButtonProps {
  page: number | ReactNode;
  setPage: () => unknown;
  isActive?: boolean;
}

export const PaginationButton = ({
  page,
  setPage,
  isActive = false,
}: PaginationButtonProps) => {
  const color = isActive ? 'blue.500' : 'blue.300';
  const backgroundColor = isActive ? 'blue.100' : 'blue.50';
  const cursor = isActive ? 'default' : 'pointer';
  const activeStyle = { backgroundColor: 'blue.100' };

  return (
    <Box onClick={setPage}>
      <Button
        color={color}
        backgroundColor={backgroundColor}
        cursor={cursor}
        _hover={activeStyle}
        _focus={activeStyle}
        _active={activeStyle}
      >
        {page}
      </Button>
    </Box>
  );
};

export default PaginationButton;
