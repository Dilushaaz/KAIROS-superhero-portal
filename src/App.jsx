import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComicStory from './components/ComicStory';
import Origin from './components/Origin';
import Abilities from './components/Abilities';
import MomentEngine from './components/MomentEngine';
import ThreatRadar from './components/ThreatRadar';
import SignalVault from './components/SignalVault';
import DefenseMetrics from './components/DefenseMetrics';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SignalVaultModal from './components/SignalVaultModal';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openVault = () => {
    setIsVaultOpen(true);
  };

  const closeVault = () => {
    setIsVaultOpen(false);
  };

  return (
    <>
      <Header onOpenSignal={openChat} onOpenVault={openVault} />
      <main id="main-content">
        <Hero onOpenSignal={openChat} />
        <ComicStory onOpenSignal={openChat} />
        <Origin />
        <Abilities />
        <MomentEngine />
        <ThreatRadar />
        <SignalVault onOpenSignal={openChat} onOpenVault={openVault} />
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

      {/* KAIROS Local Signal Vault Modal */}
      <SignalVaultModal
        isOpen={isVaultOpen}
        onClose={closeVault}
        onOpenSignal={openChat}
      />
    </>
  );
}
