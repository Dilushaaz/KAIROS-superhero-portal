import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Origin from './components/Origin';
import Abilities from './components/Abilities';
import MomentEngine from './components/MomentEngine';
import SignalVault from './components/SignalVault';
import DefenseMetrics from './components/DefenseMetrics';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Origin />
        <Abilities />
        <MomentEngine />
        <SignalVault />
        <DefenseMetrics />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
