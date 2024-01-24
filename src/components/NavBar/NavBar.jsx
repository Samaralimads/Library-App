import React from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="Navbar">
      <Link to="/" className="navLogo">
        <img src="bookshelf.png" alt="Logo" className="navLogo" />
        <h1>ShelfIndulgence</h1>
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
        <input className="searchBar" type="text" placeholder="Search Books" />
      </div>
    </nav>
  );
}

export default NavBar;
