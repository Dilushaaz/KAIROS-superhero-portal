import React from 'react';
import { Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-block">
            <div className="brand-logo" style={{ marginBottom: '0.4rem' }}>
              <Disc className="brand-icon" aria-hidden="true" />
              <span className="brand-title">KAIROS</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--color-accent-cyan)' }}>
              KAIROS // THE MOMENT KEEPER
            </p>
            <div className="footer-status-pill">
              <span className="status-dot" aria-hidden="true"></span>
              <span>Kairos Guardian Network: ONLINE</span>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer Navigation">
            <a href="#origin" className="footer-nav-link">ORIGIN</a>
            <a href="#abilities" className="footer-nav-link">ABILITIES</a>
            <a href="#moment-engine" className="footer-nav-link">MOMENT ENGINE</a>
            <a href="#signal-vault" className="footer-nav-link">SIGNAL VAULT</a>
          </nav>
        </div>

        <div className="footer-divider" aria-hidden="true"></div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} KAIROS // THE MOMENT KEEPER. All rights reserved.</span>
          <span>SYSTEM IDENTIFIER: KRS-KGN-9904-SEC07</span>
        </div>
      </div>
    </footer>
  );
}
