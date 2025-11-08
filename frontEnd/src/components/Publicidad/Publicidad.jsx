import React from 'react';
import './Publicidad.css';

const Publicidad = () => (
  <section className="p-0" id="portfolio">
    <div className="container-fluid p-0">
      <div className="row g-0">
        {[
          {
            img: "/assets/img/muestras/cafeteriapromo.jpg",
            categoria: "bar",
            nombre: "Desayuno y meriendas"
          },
          {
            img: "/assets/img/muestras/vinos.jpg",
            categoria: "Vinoteca",
            nombre: "Oferta de la semana"
          },
          {
            img: "/assets/img/muestras/sabanas.jpg",
            categoria: "Colchoneria",
            nombre: "Oferta hasta agotar stock"
          },
          {
            img: "/assets/img/muestras/ROPA.jpg",
            categoria: "Ropa",
            nombre: "Rebajas de temporada"
          },
          {
            img: "/assets/img/muestras/gim.jpg",
            categoria: "Entrenamiento",
            nombre: "Clases personales"
          },
          {
            img: "/assets/img/muestras/promocion.jpg",
            categoria: "optica",
            nombre: "Promo verano"
          }
        ].map((promo, index) => (
          <div key={index} className="col-sm-6 col-lg-4">
            <a
              className="portfolio-box"
              href={promo.img}
              data-lightbox="galeria"
              data-title={promo.nombre}
            >
              <img
                className="img-fluid aspect-ratio-16x9"
                src={promo.img}
                alt={promo.nombre}
              />
              <div className="portfolio-box-caption">
                <div className="portfolio-box-caption-content">
                  <div className="project-category text-faded">
                    <span>{promo.categoria}</span>
                  </div>
                  <div className="project-name">
                    <span>{promo.nombre}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Publicidad;