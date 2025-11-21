import React from 'react';
import './Contact.css';

const Contact = () => (
  <section id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 text-center mx-auto">
          <h2 className="section-heading">Galeria Tafi Viejo</h2>
          <hr className="my-4" />
          <p className="mb-5">
            Envia tu propuesta comercial o actividad, tu consulta no nos molesta
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 text-center ms-auto">
          <i
            className="fa fa-phone mb-3 fa-3x"
            data-aos="zoom-in"
            data-aos-duration="300"
            data-aos-once="true"
          ></i>
          <p>03-03-456</p>
        </div>
        <div className="col-lg-4 text-center me-auto">
          <i
            className="fa fa-envelope-o mb-3 fa-3x"
            data-aos="zoom-in"
            data-aos-duration="300"
            data-aos-delay="300"
            data-aos-once="true"
          ></i>
          <p>
            <a href="mailto:your-email@your-domain.com">
              elaboutUs@elaboutUs.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;