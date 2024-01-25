import React, { useState } from "react";
import "./NavBar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/books?search=${searchTerm}`);

    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="Navbar">
      <Link to="/" className="navLogo">
        <img src="/bookshelf.png" alt="Logo" className="navLogo" />
        <h1>Shelf-Indulgence</h1>
      </Link>
      <div className="navLinks">
        <NavLink to="/" className="navLink">
          Home
        </NavLink>
        <NavLink to="/books" className="navLink">
          Books
        </NavLink>
        <NavLink to="/my-books" className="navLink">
          My Books
        </NavLink>
        <div className="searchContainer">
          <input
            className="searchBar"
            type="text"
            placeholder="Search Books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="searchIcon"
            onClick={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
