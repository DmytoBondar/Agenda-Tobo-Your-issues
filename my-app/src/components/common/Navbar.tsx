import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="div d-flex justify-content-between">
          <Link to="/" style={{textDecoration:'none', color:"white"}}><h3>Agenda</h3></Link>
        </div>
      </div >
    </nav >
  )
}

export default Navbar
