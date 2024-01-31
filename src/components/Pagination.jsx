import React from 'react';
import "./css/Pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="row">
      <div className="col-md-12 mt-5 mb-5">
        <div className="w_btn">
          <div className="pagin">
            <div
              className={`btn_disable btn-light btn btn-reveal ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            >
              Prev
            </div>
            {pageNumbers.map((number) => (
              <div
                key={number}
                className={`btn_paginat btn btn-reveal ${currentPage === number ? 'cur_p' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            ))}
            <div
              className={`btn_paginat btn_next btn btn-reveal ${currentPage === Math.ceil(totalPosts / postsPerPage) ? 'disabled' : ''}`}
              onClick={() => currentPage < Math.ceil(totalPosts / postsPerPage) && paginate(currentPage + 1)}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
