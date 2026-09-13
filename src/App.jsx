import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Origin from './components/Origin';
import Abilities from './components/Abilities';
import MomentEngine from './components/MomentEngine';
import SignalVault from './components/SignalVault';
import DefenseMetrics from './components/DefenseMetrics';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Header onOpenSignal={openChat} />
      <main id="main-content">
        <Hero onOpenSignal={openChat} />
        <Origin />
        <Abilities />
        <MomentEngine />
        <SignalVault onOpenSignal={openChat} />
        <DefenseMetrics />
        <FinalCTA onOpenSignal={openChat} />
      </main>
      <Footer />

      {/* KAIROS Conversational Signal Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={closeChat}
        onOpen={openChat}
      />
    </>
  );
}
