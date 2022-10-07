import React from "react";
import "./subnavbar.scss";
import { Link } from "react-router-dom";

export function Subnavbar() {
  return (
    <React.Fragment>
      <div className="subnavbar">
        <div className="menu">
          <Link to="billingYears" style={{ textDecoration: "none" }}>
            <button className="menuItem">Lata rozliczeniowe</button>
          </Link>
          <Link to="billingPeriods" style={{ textDecoration: "none" }}>
            <button className="menuItem">Okresy rozliczeniowe</button>
          </Link>
          <Link to="billsTemplates" style={{ textDecoration: "none" }}>
            <button className="menuItem">Szablony płatności</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
