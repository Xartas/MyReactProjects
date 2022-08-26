import React from "react";
import "./Navbar.scss";
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <div className="menu">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="menuItem">Rachunki</button>
        </Link>
        <Link to="/credits">
          <button className="menuItem">Kredyty</button>
        </Link>
        <Link to="/login">
          <button className="menuItem">Logowanie</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
