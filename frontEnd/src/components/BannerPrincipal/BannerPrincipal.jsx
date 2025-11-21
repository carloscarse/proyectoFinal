import React from 'react';
import './BannerPrincipal.css';

const BannerPrincipal = () => (
  <section id="banner" className="banner">
    <div className="container">
      <h1 className="text-uppercase fw-bold mb-4 fs-1">
        Galería Comercial Paseo Tafí
      </h1>
      <p className="lead mb-4 fs-5">
        Ubicado en el Corazón de la Ciudad, el Paseo Comercial Paseo Tafí ofrece Locales Comerciales, Reservas Por Internet, Seguridad, Estacionamiento y Atención Personalizada.
      </p>
      <a href="#services" className="btn btn-warning btn-lg text-uppercase fw-bold">
        Ver espacios disponibles
      </a>
    </div>
  </section>
);

export default BannerPrincipal;