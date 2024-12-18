import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <BootstrapPagination>
        {pageNumbers.map(number => (
          <BootstrapPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
