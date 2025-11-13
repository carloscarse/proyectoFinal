import React from 'react';
import './PromoCall.css';

const PromoCall = () => (
  <section className="text-white bg-dark">
    <div className="container text-center">
      <h2 className="mb-4">Publicita tu local o actividad</h2>
      <a
        className="btn btn-light btn-xl"
        role="button"
        data-aos="zoom-in"
        data-aos-duration="400"
        data-aos-once="true"
        href="#contact"
      >
        Contacto
      </a>
    </div>
  </section>
);

export default PromoCall;