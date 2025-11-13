import React from 'react';
import './About.css';

const About = () => (
  <section id="about" className="bg-primary">
    <div className="container">
      <div className="row">
        <div className="col offset-lg-8 text-center mx-auto">
          <h2 className="text-white section-heading">
            Una galería pensada para múltiples actividades
          </h2>
          <hr className="my-4 light" />
          <p className="mb-4 text-faded">
            La Galería Comercial Paseo Tafí ofrece espacios para alquiler comercial, entrenamiento físico y rehabilitación. Con una distribución única que incluye locales, salón, piscina terapéutica, bar y espacio verde, podes realizar reservas en nuestros espacios de actividades.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;