import React from 'react';
import "./css/Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePagination = (pageNumber) => {
    paginate(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <div className="row">
      <div className="col-md-12 mt-5 mb-5">
        <div className="w_btn">
          <div className="pagin">
            <div className="right-align">
              <div className="page-info">
                Showing {currentPage} of {totalPages}
              </div>
              <div
                className={`btn_disable btn-light btn btn-reveal ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && handlePagination(currentPage - 1)} // Use handlePagination
              >
                Prev
              </div>
              <div
                className={`btn_paginat btn_next btn btn-reveal ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && handlePagination(currentPage + 1)} // Use handlePagination
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
