3// frontEnd/src/pages/Home.jsx
import React, { useState } from "react";

// Componentes compartidos
import BannerPrincipal from "../components/BannerPrincipal";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import Login from "../components/Login";

// Secciones de la página
import About from "./About";
import Services from "./Services";
import Publicidad from "./Informe";
import PromoCall from "./PromoCall";
import Contact from "./Contact";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <main>
      {/* Barra de navegación con botón de login */}
      <MainNav onLoginClick={() => setShowLogin(true)} />

      {/* Modal de login */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      {/* Secciones principales */}
      <BannerPrincipal />
      <About />
      <Services />
      <Publicidad />
      <PromoCall />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;