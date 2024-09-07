import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchField = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Please search by Applicant Id Number"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchField;
