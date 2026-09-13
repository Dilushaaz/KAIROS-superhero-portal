import React, { useState, useEffect } from 'react';
import { Database, X, Filter, ShieldCheck, Clock, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import { getStoredSignals } from '../utils/vaultService';
import { playClickSound } from '../utils/soundService';

export default function SignalVaultModal({ isOpen, onClose, onOpenSignal }) {
  const [signals, setSignals] = useState(getStoredSignals);
  const [filter, setFilter] = useState('ALL');

  // Listen for vault updates fired from ChatWidget
  useEffect(() => {
    const handleVaultUpdated = () => {
      setSignals(getStoredSignals());
    };
    window.addEventListener('kairos-vault-updated', handleVaultUpdated);
    return () => window.removeEventListener('kairos-vault-updated', handleVaultUpdated);
  }, []);

  if (!isOpen) return null;

  const filteredSignals = signals.filter((sig) => {
    if (filter === 'ALL') return true;
    return sig.distressLevel === filter;
  });

  const getPriorityBadge = (level) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="vault-priority-badge critical">🔴 CRITICAL</span>;
      case 'URGENT':
        return <span className="vault-priority-badge urgent">🟡 URGENT</span>;
      case 'LOW':
      default:
        return <span className="vault-priority-badge low">🟢 LOW</span>;
    }
  };

  const handleFilterClick = (newFilter) => {
    playClickSound();
    setFilter(newFilter);
  };

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  const handleNewSignal = () => {
    playClickSound();
    onClose();
    if (onOpenSignal) {
      onOpenSignal();
    }
  };

  return (
    <div className="vault-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="vault-modal-title">
      <div className="glass-card vault-modal-window">
        {/* Modal Header */}
        <div className="vault-modal-header">
          <div className="vault-title-group">
            <div className="vault-icon-badge" aria-hidden="true">
              <Database size={18} />
            </div>
            <div>
              <h3 id="vault-modal-title" className="vault-modal-title">KAIROS SIGNAL VAULT</h3>
              <span className="vault-modal-sub">ACTIVE LOCAL ARCHIVE // TELEMETRY LOG</span>
            </div>
          </div>

          <div className="vault-header-actions">
            <button
              type="button"
              className="chat-close-btn"
              onClick={handleClose}
              aria-label="Close Signal Vault Modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Security & Demonstration Notice */}
        <div className="vault-security-notice" role="note">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>
            DEMONSTRATION ARCHIVE: Signals are recorded to client-side localStorage. Encrypted visual theme is for simulation purposes.
          </span>
        </div>

        {/* Controls & Filter Bar */}
        <div className="vault-filter-bar">
          <div className="filter-group">
            <Filter size={13} aria-hidden="true" />
            <span className="filter-label">FILTER PRIORITY:</span>
            {['ALL', 'CRITICAL', 'URGENT', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`filter-btn ${filter === lvl ? 'active' : ''}`}
                onClick={() => handleFilterClick(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          <span className="vault-count-badge">
            {filteredSignals.length} RECORD{filteredSignals.length !== 1 ? 'S' : ''} FOUND
          </span>
        </div>

        {/* Signals List / Table */}
        <div className="vault-list-container" role="feed">
          {filteredSignals.length === 0 ? (
            <div className="vault-empty-state">
              <AlertTriangle size={28} aria-hidden="true" />
              <p>NO SIGNALS MATCHING FILTER '{filter}'</p>
              <span>Transmit a priority signal via KAIROS to populate this repository.</span>
            </div>
          ) : (
            filteredSignals.map((sig) => (
              <article key={sig.id} className="vault-signal-card" aria-labelledby={`sig-title-${sig.id}`}>
                <div className="vault-card-header">
                  <div className="vault-signal-id-block">
                    <span id={`sig-title-${sig.id}`} className="vault-signal-id">
                      {sig.id}
                    </span>
                    {getPriorityBadge(sig.distressLevel)}
                  </div>

                  <div className="vault-status-indicator">
                    <CheckCircle size={13} aria-hidden="true" />
                    <span>STATUS: {sig.status || 'DISPATCHED'}</span>
                  </div>
                </div>

                <div className="vault-meta-grid">
                  <div className="vault-meta-item">
                    <span className="meta-label">CITIZEN:</span>
                    <span className="meta-value">{sig.name} ({sig.age} y/o)</span>
                  </div>
                  <div className="vault-meta-item">
                    <span className="meta-label">SECTOR:</span>
                    <span className="meta-value">{sig.location}</span>
                  </div>
                  <div className="vault-meta-item">
                    <span className="meta-label">TRANSMIT COMMS:</span>
                    <span className="meta-value">{sig.email}</span>
                  </div>
                  <div className="vault-meta-item">
                    <span className="meta-label">TIMESTAMP:</span>
                    <span className="meta-value mono">
                      <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                      {sig.timestamp}
                    </span>
                  </div>
                </div>

                <div className="vault-grievance-block">
                  <span className="grievance-label">GRIEVANCE / DISTRESS TELEMETRY:</span>
                  <p className="grievance-text">{sig.grievance}</p>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="vault-modal-footer">
          <span className="vault-footer-telemetry">
            KAIROS GUARDIAN LOG // SECURE DISPATCH COMPLIANT
          </span>
          <div className="vault-footer-buttons">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleNewSignal}
            >
              <Radio size={14} aria-hidden="true" />
              <span>TRANSMIT NEW SIGNAL</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleClose}
            >
              <span>CLOSE ARCHIVE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
