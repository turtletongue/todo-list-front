import { ReactNode } from 'react';

import PaginationButton from '../components/pagination-button/pagination-button.component';

export const getPageNumberButtons = (
  pagesCount: number,
  setPage: (page: number) => unknown,
  activePageNumber?: number
) => {
  const buttons: ReactNode[] = [];

  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
    buttons.push(
      <PaginationButton
        key={pageNumber}
        page={pageNumber}
        isActive={pageNumber === activePageNumber}
        setPage={() => setPage(pageNumber)}
      />
    );
  }

  return buttons;
};
