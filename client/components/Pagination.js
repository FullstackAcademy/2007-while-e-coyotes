import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, currentPage, changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul>
        {
          <li key="prev" className="prev">
            { currentPage > 1 ?
              <a href='#' onClick={ (e) => {
                e.preventDefault();
                changePage(currentPage - 1)
              }
              }>Prev</a> :
              <p>Prev</p>
            }
          </li>
        }
        { pageNumbers.map(num => {
          return (
            <li key={num} className={num === currentPage ? "pagination-item pagination-item__active" : "pagination-item" }>
              <a href='#' onClick={ (e) => {
                e.preventDefault();
                changePage(num)
              }
              }>{num}</a>
            </li>
          )
        })}
        {
          <li key="next" className="next">
            { currentPage < pageNumbers.length ?
              <a href='#' onClick={ (e) => {
                e.preventDefault();
                changePage(currentPage + 1)
              }
              }>Next</a> :
              <p>Next</p>
            }
          </li>
        }
      </ul>
    </div>
  )
}

export default Pagination;
