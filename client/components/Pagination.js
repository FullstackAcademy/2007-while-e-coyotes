import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, currentPage, changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {
        currentPage > 1 && <li key="prev" className="pagination-item pagination-item__prev" onClick={ () => changePage(currentPage - 1) } >
          Previous
        </li>
      }
      { pageNumbers.map(num => {
        return (
          <li key={num} className={num === currentPage ? "pagination-item pagination-item__active" : "pagination-item" } onClick={ () => changePage(num) } >
            {num}
          </li>
        )
      })}
      {
        currentPage < pageNumbers.length && <li key="next" className="pagination-item pagination-item__next" onClick={ () => changePage(currentPage + 1) } >
          Next
        </li>
      }
    </ul>
  )
}

export default Pagination;
