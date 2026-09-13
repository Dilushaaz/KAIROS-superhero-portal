import React, { useState } from 'react';
import { Radio, Menu, X, Disc } from 'lucide-react';

export default function Header({ onOpenSignal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignalClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    if (onOpenSignal) {
      onOpenSignal();
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
          <a href="#origin" className="nav-link">ORIGIN</a>
          <a href="#abilities" className="nav-link">ABILITIES</a>
          <a href="#moment-engine" className="nav-link">MOMENT ENGINE</a>
          <a href="#signal-vault" className="nav-link">SIGNAL VAULT</a>
        </nav>

        {/* Header CTA */}
        <div className="header-cta">
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
          <a href="#signal-vault" className="nav-link" onClick={closeMobileMenu}>SIGNAL VAULT</a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignalClick}
            aria-label="Send a signal to open KAIROS chatbot"
          >
            <Radio size={16} aria-hidden="true" />
            <span>SEND A SIGNAL</span>
          </button>
        </div>
      )}
    </header>
  );
}
