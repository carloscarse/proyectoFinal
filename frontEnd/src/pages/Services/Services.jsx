import React from 'react';
import './Services.css';

const Services = () => (
  <section id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading">
            Locales comerciales y espacios compartidos
          </h2>
          <hr className="my-4" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        {[
          {
            img: "/assets/img/servicios/shop.png",
            title: "Galeria de locales",
            desc: "Pensado para rubros variados, distribución y ubicación estratégica"
          },
          {
            img: "/assets/img/servicios/pool.png",
            title: "Piscina",
            desc: "Ideal para sesiones de rehabilitación motriz y actividades terapéuticas"
          },
          {
            img: "/assets/img/servicios/dez-blah-xfYBYj26Wik-unsplash.jpg",
            title: "Entrenamiento físico",
            desc: "Ideal para clases de pilates, crossfit, musculación o rehabilitación"
          },
          {
            img: "/assets/img/servicios/coffee.png",
            title: "Bar pet friendly",
            desc: "Zona gastronómica y área de descanso, al aire libre"
          }
        ].map((service, index) => (
          <div key={index} className="col-md-6 col-lg-3 text-center">
            <img
              className="img-fluid aspect-ratio-4x3"
              width="650"
              height="433"
              src={service.img}
              alt={service.title}
            />
            <div className="mt-5 mx-auto service-box">
              <h3 className="mb-3">{service.title}</h3>
              <p className="text-muted mb-0">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;