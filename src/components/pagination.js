/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="flex justify-around p-4 m-6 xl:w-full text-center">
      <div className="text-[#31394E] font-bold md:px-12 py-2">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? " cursor-not-allowed text-[#31394E] font-bold shadow-md"
              : "bg-[#F6F6F6]-950 text-[#31394E] font-bold shadow-md "
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? " cursor-not-allowed text-[#31394E] font-bold shadow-md "
              : "bg-[#F6F6F6]-950 text-[#31394E] font-bold shadow-md"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
