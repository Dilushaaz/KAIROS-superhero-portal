import React from 'react';
import { Database, Radio, Lock } from 'lucide-react';

export default function SignalVault({ onOpenSignal }) {
  return (
    <section id="signal-vault" className="section" aria-labelledby="signal-vault-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Database size={13} aria-hidden="true" />
            <span>SECURE SIGNAL REPOSITORY</span>
          </div>
          <h2 id="signal-vault-heading" className="section-title">SIGNAL VAULT</h2>
          <p className="section-description">
            Encrypted vault repository for incoming distress transmissions awaiting temporal analysis by Kairos.
          </p>
        </div>

        <div className="glass-card signal-vault-card">
          <div className="vault-header">
            <div className="vault-badge">
              <span className="status-dot" aria-hidden="true"></span>
              <span>LIVE RECEPTOR ACTIVE // VAULT SECTOR 07</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} /> PROTOCOL: AES-256
            </span>
          </div>

          {/* Sample Fictional Signal Record */}
          <div className="record-grid">
            <div className="record-item">
              <span className="record-label">SIGNAL ID</span>
              <span className="record-value highlight-cyan">KRS-2026-001</span>
            </div>

            <div className="record-item">
              <span className="record-label">STATUS</span>
              <span className="record-value highlight-amber">AWAITING SIGNAL</span>
            </div>

            <div className="record-item">
              <span className="record-label">MOMENT</span>
              <span className="record-value">NOT YET DETECTED</span>
            </div>
          </div>

          <div className="vault-footer-action">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenSignal}
              aria-label="Send a signal to open KAIROS chatbot"
            >
              <Radio size={16} aria-hidden="true" />
              <span>SEND A SIGNAL</span>
            </button>
            <p className="vault-notice">
              Transmissions are processed in priority order through the Moment Engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
