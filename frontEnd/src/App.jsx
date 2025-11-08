import React from 'react';
import BannerPrincipal from './components/BannerPrincipal';
import MainNav from './components/MainNav';
import About from './components/About';
import Services from './components/Services';
import Publicidad from './components/Publicidad';
import PromoCall from './components/PromoCall';
import Contact from './components/Contact';
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
