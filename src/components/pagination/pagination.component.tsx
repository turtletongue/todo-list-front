import { HStack, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import PaginationButton from '../pagination-button/pagination-button.component';
import { getPageNumberButtons } from '../../utils/get-page-button';
import { DEFAULT_FETCH_LIMIT } from '../../contants';

interface PaginationProps {
  pageNumber: number;
  total: number;
  limit?: number;
  setPage: (page: number) => unknown;
}

export const Pagination = ({
  pageNumber,
  total,
  setPage,
  limit = DEFAULT_FETCH_LIMIT,
}: PaginationProps) => {
  const pagesCount = Math.ceil(total / limit);

  const shouldRenderPagination = pagesCount > 1;

  const isCurrentPageFirst = pageNumber > 1;
  const isCurrentPageLast = pageNumber < pagesCount;

  const setPreviousPage = () => setPage(pageNumber - 1);
  const setNextPage = () => setPage(pageNumber + 1);

  return (
    <>
      {shouldRenderPagination && (
        <HStack marginLeft="1rem" marginTop="0.5rem">
          {isCurrentPageFirst && (
            <PaginationButton
              setPage={setPreviousPage}
              page={
                <Icon as={AiOutlineArrowLeft} w={5} h={5} color="blue.300" />
              }
            />
          )}
          {getPageNumberButtons(pagesCount, setPage, pageNumber)}
          {isCurrentPageLast && (
            <PaginationButton
              setPage={setNextPage}
              page={
                <Icon as={AiOutlineArrowRight} w={5} h={5} color="blue.300" />
              }
            />
          )}
        </HStack>
      )}
    </>
  );
};

export default Pagination;
