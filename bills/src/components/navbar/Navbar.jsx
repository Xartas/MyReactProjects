import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

function Navbar({ auth }) {
  const logOutUser = () => {
    signOut(auth);
    console.log("Wylogowanie");
  };

  console.log(auth);
  return (
    <div className="navbar">
      <div className="menu">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="menuItem">Rachunki</button>
        </Link>
        <Link to="/credits">
          <button className="menuItem">Kredyty</button>
        </Link>
        <Link to="/logout">
          <button className="menuItem" onClick={logOutUser}>
            Wyloguj
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
