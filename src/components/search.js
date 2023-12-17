/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center">
      {/* <FontAwesomeIcon icon={faSearch} className="text-gray-400 pb-2 z-10" /> */}
      <input
        className="w-[50vh] ml-[-24px]  mb-2 h-10 border border-gray-300 bg-[#FAFAFA] rounded-lg"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        data-testid="student-search-input"
      />
    </div>
  );
};

export default Search;
