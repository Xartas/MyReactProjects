import React from 'react'
import "./Credits.scss";
import Navbar from '../../components/navbar/Navbar';

function Credits({auth}) {
  return (
    <React.Fragment>
        <Navbar auth={auth}/>
        <div className="container">Kredyty</div>
    </React.Fragment>
  )
}

export default Credits