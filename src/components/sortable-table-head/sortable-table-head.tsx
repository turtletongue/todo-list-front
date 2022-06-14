import { Icon, Th } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

interface SortableTableHeadProps {
  children: ReactNode;
  order: 'asc' | 'desc' | null;
  toggleOrder: () => void;
}

export const SortableTableHead = ({
  children,
  order,
  toggleOrder,
}: SortableTableHeadProps) => {
  let arrowIcon;

  if (order === 'asc') {
    arrowIcon = AiOutlineArrowUp;
  } else if (order === 'desc') {
    arrowIcon = AiOutlineArrowDown;
  }

  return (
    <Th onClick={toggleOrder} cursor="pointer" userSelect="none">
      {children}
      {arrowIcon && <Icon as={arrowIcon} w={3} h={3} marginLeft="0.2rem" />}
    </Th>
  );
};

export default SortableTableHead;
