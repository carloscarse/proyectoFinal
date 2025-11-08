import React from 'react';
import './MainNav.css';

const MainNav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand" href="#page-top">galeria tafi viejo</a>
      <button
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        className="navbar-toggler"
        type="button"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-align-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#about">nosotros</a></li>
          <li className="nav-item"><a className="nav-link" href="#services">servicios</a></li>
          <li className="nav-item"><a className="nav-link" href="#portfolio">Promociones</a></li>
          <li className="nav-item"><a className="nav-link" href="#contact">Contactanos</a></li>
        </ul>
      </div>
      <button className="btn btn-outline-light" type="button">
        login
      </button>
    </div>
  </nav>
);

export default MainNav;