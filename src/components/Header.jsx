import React, { useState } from 'react';
import { Menu, X, Database, Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClickSound, playVaultSound } from '../utils/soundService';

export default function Header({ onOpenSignal, onOpenVault }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const toggleMobileMenu = () => {
    playClickSound();
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    playClickSound();
    closeMobileMenu();
    if (onOpenSignal) {
      onOpenSignal();
    }
  };

  const handleVaultClick = (e) => {
    e.preventDefault();
    playClickSound();
    playVaultSound();
    closeMobileMenu();
    if (onOpenVault) {
      onOpenVault();
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Container matching reference */}
        <a href="#" className="brand-container" onClick={closeMobileMenu} aria-label="KAIROS Home">
          <div className="brand-logo">
            <span className="brand-title">KAI<span className="logo-chevron">R</span>OS</span>
          </div>
          <span className="brand-subtitle">PEOPLE &gt; SAFER &gt; STRONGER &gt; TOGETHER</span>
        </a>

        {/* Desktop Navigation matching reference */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#" className="nav-link active" onClick={playClickSound}>HOME</a>
          <a href="#comic-story" className="nav-link" onClick={playClickSound}>OUR STORY</a>
          <a href="#threat-radar" className="nav-link" onClick={playClickSound}>LIVE RADAR</a>
          <a href="#signal-vault" className="nav-link" onClick={handleVaultClick}>SIGNAL VAULT</a>
          <a href="#contact" className="nav-link" onClick={handleContactClick}>CONTACT</a>
        </nav>

        {/* Header Controls & Sound Toggle matching reference */}
        <div className="header-cta">
          {/* Quick Access Signal Vault */}
          <button
            type="button"
            className="btn btn-header-vault"
            onClick={handleVaultClick}
            aria-label="Open local Signal Vault archive"
            title="Open local Signal Vault records"
          >
            <Database size={13} aria-hidden="true" />
            <span>VAULT</span>
          </button>

          {/* Sound Toggle Pill with Animated Waveform Bars matching reference */}
          <button
            type="button"
            className={`btn-sound-pill ${soundActive ? 'active' : 'muted'}`}
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Mute KAIROS audio' : 'Unmute KAIROS audio'}
            title={soundActive ? 'Sound: ON (Click to Mute)' : 'Sound: MUTED (Click to Enable)'}
          >
            {soundActive ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
            <span className="sound-toggle-text">{soundActive ? 'SOUND ON' : 'MUTED'}</span>
            <div className={`sound-equalizer-bars ${soundActive ? 'playing' : ''}`} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <a href="#" className="nav-link active" onClick={closeMobileMenu}>HOME</a>
          <a href="#comic-story" className="nav-link" onClick={closeMobileMenu}>OUR STORY</a>
          <a href="#threat-radar" className="nav-link" onClick={closeMobileMenu}>LIVE RADAR</a>
          <a href="#signal-vault" className="nav-link" onClick={handleVaultClick}>SIGNAL VAULT</a>
          <a href="#contact" className="nav-link" onClick={handleContactClick}>CONTACT</a>

          <div className="mobile-drawer-controls">
            <button
              type="button"
              className={`btn-sound-pill ${soundActive ? 'active' : 'muted'}`}
              onClick={handleToggleSound}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{soundActive ? 'SOUND ON' : 'MUTED'}</span>
              <div className={`sound-equalizer-bars ${soundActive ? 'playing' : ''}`}>
                <span></span><span></span><span></span><span></span>
              </div>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleVaultClick}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Database size={15} />
              <span>ACCESS SIGNAL VAULT</span>
            </button>

            <button
              type="button"
              className="btn btn-primary-blue"
              onClick={handleContactClick}
              aria-label="Send a signal to open KAIROS chatbot"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>SEND A SIGNAL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
