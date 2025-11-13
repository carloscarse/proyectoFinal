import React, { useState } from "react";
import BannerPrincipal from "../components/BannerPrincipal";
import MainNav from "../components/MainNav";
import About from "./About";
import Services from "./Services";
import Publicidad from "./Publicidad";
import PromoCall from "./PromoCall";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Login from "../components/Login";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <MainNav onLoginClick={() => setShowLogin(true)} />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <BannerPrincipal />
      <About />
      <Services />
      <Publicidad />
      <PromoCall />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;