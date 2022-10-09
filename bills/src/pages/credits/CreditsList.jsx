import React from "react";

function CreditsList({ credits }) {
  return (
    <React.Fragment>
      <ul>
        {credits.map((credit) => (
          <li key={credit.id}>{credit.title}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default CreditsList;
