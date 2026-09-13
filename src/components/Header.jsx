import React, { useState } from 'react';
import { Radio, Menu, X, Disc, Volume2, VolumeX, Database } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClickSound } from '../utils/soundService';

export default function Header({ onOpenSignal, onOpenVault }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const toggleMobileMenu = () => {
    playClickSound();
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignalClick = (e) => {
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
    closeMobileMenu();
    if (onOpenVault) {
      onOpenVault();
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="brand-container" onClick={closeMobileMenu} aria-label="KAIROS Home">
          <div className="brand-logo">
            <Disc className="brand-icon" aria-hidden="true" />
            <span className="brand-title">KAIROS</span>
          </div>
          <span className="brand-subtitle">THE MOMENT KEEPER</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#origin" className="nav-link" onClick={playClickSound}>ORIGIN</a>
          <a href="#abilities" className="nav-link" onClick={playClickSound}>ABILITIES</a>
          <a href="#moment-engine" className="nav-link" onClick={playClickSound}>MOMENT ENGINE</a>
          <a href="#threat-radar" className="nav-link" onClick={playClickSound}>DEFENSE RADAR</a>
          <a href="#signal-vault" className="nav-link" onClick={playClickSound}>SIGNAL VAULT</a>
        </nav>

        {/* Header CTA & Controls */}
        <div className="header-cta">
          {/* Sound FX ON/OFF Toggle */}
          <button
            type="button"
            className={`btn-sound-toggle ${soundActive ? 'active' : 'muted'}`}
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Mute KAIROS audio effects' : 'Unmute KAIROS audio effects'}
            title={soundActive ? 'Audio FX: ON (Click to Mute)' : 'Audio FX: MUTED (Click to Enable)'}
          >
            {soundActive ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
            <span className="sound-toggle-text">{soundActive ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Quick Access Signal Vault Modal */}
          <button
            type="button"
            className="btn btn-header-vault"
            onClick={handleVaultClick}
            aria-label="Open local Signal Vault archive modal"
            title="Open local Signal Vault records"
          >
            <Database size={13} aria-hidden="true" />
            <span>VAULT LOG</span>
          </button>

          {/* Send Signal Chat Trigger */}
          <button
            type="button"
            className="btn btn-header-signal"
            onClick={handleSignalClick}
            aria-label="Send a signal to open KAIROS chatbot"
          >
            <Radio size={14} aria-hidden="true" />
            <span>SEND A SIGNAL</span>
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
          <a href="#origin" className="nav-link" onClick={closeMobileMenu}>ORIGIN</a>
          <a href="#abilities" className="nav-link" onClick={closeMobileMenu}>ABILITIES</a>
          <a href="#moment-engine" className="nav-link" onClick={closeMobileMenu}>MOMENT ENGINE</a>
          <a href="#threat-radar" className="nav-link" onClick={closeMobileMenu}>DEFENSE RADAR</a>
          <a href="#signal-vault" className="nav-link" onClick={closeMobileMenu}>SIGNAL VAULT</a>

          <div className="mobile-drawer-controls">
            <button
              type="button"
              className={`btn-sound-toggle ${soundActive ? 'active' : 'muted'}`}
              onClick={handleToggleSound}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{soundActive ? 'AUDIO FX: ACTIVE' : 'AUDIO FX: MUTED'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleVaultClick}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Database size={15} />
              <span>ACCESS SIGNAL VAULT LOG</span>
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSignalClick}
              aria-label="Send a signal to open KAIROS chatbot"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Radio size={16} aria-hidden="true" />
              <span>SEND A SIGNAL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
