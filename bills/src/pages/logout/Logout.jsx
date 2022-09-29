import React from "react";
import { Link } from "react-router-dom";
import "./Logout.scss";

function Logout() {
  return (
    <React.Fragment>
      <div className="logoutWrapper">
        <div className="logutMessage">
          <h1>Poprawnie się wylogowałeś!</h1>
          <Link to="/"><p>Zaloguj się ponownie</p></Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Logout;
