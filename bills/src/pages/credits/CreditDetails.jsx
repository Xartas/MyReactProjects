import React from "react";

export default function CreditDetails({ credit }) {
  return (
    <React.Fragment>
      {credit && (
        <div className="creditDetails">
          <h3>DANE KREDYTU</h3>
          <p className="creditTitle">Tytuł kredytu: {credit.title}</p>
          <p className="creditDescription">Opis umowy: {credit.description}</p>
          <div className="financeData">
            <h3>DANE FINANSOWE</h3>
            <p>Kwota kredytu: {credit.value}</p>
            <p>Ilosć rat: {credit.installmentsCount}</p>
            <p>Pozostało do spłaty: {credit.unpaidValue}</p>
            <p>Ilosć rat opłaconych: {credit.installmentsPaid}</p>
            <p>Ilość rat nieopłaconych: {credit.installmentsUnpaid}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
