import React, { useState } from "react";
import BannerPrincipal from "../components/BannerPrincipal";
import MainNav from "../components/MainNav";
import About from "./About";
import Services from "./Services";
import Publicidad from "./Informe";
import PromoCall from "./PromoCall";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Login from "../components/Login";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <main>
      <MainNav onLoginClick={() => setShowLogin(true)} />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <BannerPrincipal />
      <About />
      <Services />
      <Publicidad />
      <PromoCall />
      <Contact />
      <Footer />
    </main>
  );
};


export default Home;