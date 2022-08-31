import React from 'react'
import "./Bills.scss"
import Navbar from './../../components/navbar/Navbar';

function Bills({auth}) {
  return (
    <React.Fragment>
        <Navbar auth={auth}/>
        <div className="container">Rachunki</div>
    </React.Fragment>
  )
}

export default Bills