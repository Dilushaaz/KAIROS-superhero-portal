import React, { useState, useEffect } from 'react';
import { Database, Radio, Lock, FolderOpen } from 'lucide-react';
import { getStoredSignals } from '../utils/vaultService';
import { playClickSound } from '../utils/soundService';

export default function SignalVault({ onOpenSignal, onOpenVault }) {
  const [signals, setSignals] = useState(getStoredSignals);

  useEffect(() => {
    const handleVaultUpdated = () => {
      setSignals(getStoredSignals());
    };
    window.addEventListener('kairos-vault-updated', handleVaultUpdated);
    return () => window.removeEventListener('kairos-vault-updated', handleVaultUpdated);
  }, []);

  const latestSignal = signals.length > 0 ? signals[0] : null;

  const handleOpenSignal = () => {
    playClickSound();
    if (onOpenSignal) onOpenSignal();
  };

  const handleOpenVault = () => {
    playClickSound();
    if (onOpenVault) onOpenVault();
  };

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
              <span>
                LIVE RECEPTOR ACTIVE // {signals.length} ARCHIVED TRANSMISSION{signals.length !== 1 ? 'S' : ''}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} /> PROTOCOL: AES-256 (SIM)
            </span>
          </div>

          {/* Dynamic / Most Recent Signal Record */}
          <div className="record-grid">
            <div className="record-item">
              <span className="record-label">LATEST SIGNAL</span>
              <span className="record-value highlight-cyan">
                {latestSignal ? latestSignal.id : 'KRS-2026-001'}
              </span>
            </div>

            <div className="record-item">
              <span className="record-label">STATUS</span>
              <span className="record-value highlight-amber">
                {latestSignal ? latestSignal.status : 'AWAITING SIGNAL'}
              </span>
            </div>

            <div className="record-item">
              <span className="record-label">PRIORITY LEVEL</span>
              <span className="record-value">
                {latestSignal ? (
                  latestSignal.distressLevel === 'CRITICAL' ? '🔴 CRITICAL' :
                  latestSignal.distressLevel === 'URGENT' ? '🟡 URGENT' : '🟢 LOW'
                ) : 'NOT YET DETECTED'}
              </span>
            </div>
          </div>

          <div className="vault-footer-action">
            <div className="vault-action-buttons">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleOpenSignal}
                aria-label="Send a signal to open KAIROS chatbot"
              >
                <Radio size={16} aria-hidden="true" />
                <span>SEND A SIGNAL</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleOpenVault}
                aria-label="Open full Signal Vault archive"
              >
                <FolderOpen size={16} aria-hidden="true" />
                <span>ACCESS VAULT ARCHIVE ({signals.length})</span>
              </button>
            </div>

            <p className="vault-notice">
              Transmissions are recorded to client-side localStorage and processed through the Moment Engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
