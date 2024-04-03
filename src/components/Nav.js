import React from 'react';
import "./Nav.css";

const Nav = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav>
      <div className="nav-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
