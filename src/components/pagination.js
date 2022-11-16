/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

// eslint-disable-next-line react/prop-types
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const cbtIDs = urlParams.get("id");

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div
              onClick={() => paginate(number)}
              // onKeyDown={handleSubmit}
              // href={`/cbt/takeCbt/?id=${cbtIDs}`}
              className="page-link"
            >
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
