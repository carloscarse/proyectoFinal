import React from 'react';
import MainNav from './components/MainNav/MainNav';
import BannerPrincipal from './components/BannerPrincipal/BannerPrincipal';
import About from './components/About/About';
import Services from './components/Services/Services';
import Publicidad from './components/Publicidad/Publicidad';
import PromoCall from './components/PromoCall';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <MainNav />
      <BannerPrincipal />
      <About />
      <Services />
      <Publicidad />
      <PromoCall />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
