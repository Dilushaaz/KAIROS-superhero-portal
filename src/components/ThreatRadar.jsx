import React, { useState, useEffect } from 'react';
import { Radar, Radio, Wifi, RefreshCw } from 'lucide-react';
import { playClickSound, playRadarSweepSound } from '../utils/soundService';

const RADAR_PINGS = [
  { id: 'p1', x: 210, y: 150, label: 'KAIROS CORE NODE', status: 'ONLINE', sector: 'SEC-07', type: 'core' },
  { id: 'p2', x: 120, y: 280, label: 'AEGIS OUTPOST', status: 'PATROL', sector: 'SEC-03', type: 'guardian' },
  { id: 'p3', x: 320, y: 220, label: 'SIGNAL BEACON', status: 'TRACKING', sector: 'SEC-11', type: 'guardian' },
  { id: 'p4', x: 270, y: 340, label: 'TEMPORAL ANOMALY', status: 'INVESTIGATING', sector: 'SEC-09', type: 'alert' },
  { id: 'p5', x: 140, y: 120, label: 'RELAY HARBOR', status: 'MONITORING', sector: 'SEC-02', type: 'guardian' }
];

export default function ThreatRadar() {
  const [activePing, setActivePing] = useState(RADAR_PINGS[0]);
  const [pulseCount, setPulseCount] = useState(148);

  // Periodic simulated telemetry tick
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePingSelect = (ping) => {
    playClickSound();
    setActivePing(ping);
  };

  const handleManualScan = () => {
    playClickSound();
    playRadarSweepSound();
    setPulseCount((prev) => prev + 5);
  };

  return (
    <section id="threat-radar" className="section threat-radar-section" aria-labelledby="radar-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Radar size={13} aria-hidden="true" />
            <span>ACTIVE DEFENSE SCANNER</span>
          </div>
          <h2 id="radar-heading" className="section-title">KAIROS DEFENSE RADAR</h2>
          <p className="section-description">
            Continuous 360° temporal and electromagnetic surveillance across the Guardian Network.
          </p>
        </div>

        <div className="radar-display-wrapper glass-card">
          {/* Top Status Header */}
          <div className="radar-header-hud">
            <div className="radar-status-badge">
              <span className="status-dot pulsing" aria-hidden="true"></span>
              <span className="hud-title">ACTIVE COVERAGE // GUARDIAN NETWORK ONLINE</span>
            </div>
            <div className="radar-header-meta">
              <span className="hud-metric">
                <Wifi size={13} aria-hidden="true" /> FREQ: 2.40 GHz
              </span>
              <span className="hud-metric highlight-cyan">
                <Radio size={13} aria-hidden="true" /> SWEEP: NOMINAL
              </span>
            </div>
          </div>

          <div className="radar-main-grid">
            {/* SVG Circular Radar Screen */}
            <div className="radar-screen-container">
              <svg
                viewBox="0 0 440 440"
                className="radar-svg"
                role="img"
                aria-label="Interactive KAIROS Threat and Defense Radar Scanner"
              >
                <defs>
                  {/* Radial sweep trailing glow */}
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.12" />
                    <stop offset="70%" stopColor="#00F0FF" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#06080D" stopOpacity="0.75" />
                  </radialGradient>

                  {/* Sweep line gradient */}
                  <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Sector shadow filter */}
                  <filter id="radarGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Radar background circle */}
                <circle cx="220" cy="220" r="200" fill="url(#radarGlow)" />

                {/* Concentric Range Rings */}
                <circle cx="220" cy="220" r="195" className="radar-ring outer" />
                <circle cx="220" cy="220" r="145" className="radar-ring" />
                <circle cx="220" cy="220" r="95" className="radar-ring" />
                <circle cx="220" cy="220" r="45" className="radar-ring inner" />

                {/* Crosshairs & Axis */}
                <line x1="20" y1="220" x2="420" y2="220" className="radar-axis" />
                <line x1="220" y1="20" x2="220" y2="420" className="radar-axis" />
                <line x1="80" y1="80" x2="360" y2="360" className="radar-axis-diagonal" />
                <line x1="80" y1="360" x2="360" y2="80" className="radar-axis-diagonal" />

                {/* Range Labels */}
                <text x="225" y="177" className="radar-text-label">500KM</text>
                <text x="225" y="127" className="radar-text-label">1000KM</text>
                <text x="225" y="77" className="radar-text-label">1500KM</text>
                <text x="225" y="27" className="radar-text-label">2000KM</text>

                {/* Cardinal Heading Markers */}
                <text x="220" y="16" textAnchor="middle" className="radar-cardinal">000° [N]</text>
                <text x="428" y="224" textAnchor="end" className="radar-cardinal">090° [E]</text>
                <text x="220" y="432" textAnchor="middle" className="radar-cardinal">180° [S]</text>
                <text x="14" y="224" textAnchor="start" className="radar-cardinal">270° [W]</text>

                {/* Animated Rotating Radar Sweep (Rotates via CSS) */}
                <g className="radar-sweep-group">
                  <path
                    d="M 220 220 L 220 20 A 200 200 0 0 1 361 78 Z"
                    className="radar-sweep-beam"
                  />
                  <line x1="220" y1="220" x2="220" y2="20" className="radar-sweep-line" />
                </g>

                {/* Center Guardian Beacon Point */}
                <circle cx="220" cy="220" r="4" className="radar-center-blip" />
                <circle cx="220" cy="220" r="10" className="radar-center-pulse" />

                {/* Interactive Radar Pings */}
                {RADAR_PINGS.map((ping) => {
                  const isSelected = activePing.id === ping.id;
                  const isAlert = ping.type === 'alert';
                  const isCore = ping.type === 'core';

                  return (
                    <g
                      key={ping.id}
                      className={`radar-ping-group ${isAlert ? 'alert' : isCore ? 'core' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handlePingSelect(ping)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Outer ping pulse wave */}
                      <circle
                        cx={ping.x}
                        cy={ping.y}
                        r={isSelected ? 16 : 12}
                        className="ping-pulse-ring"
                      />
                      {/* Inner solid ping point */}
                      <circle
                        cx={ping.x}
                        cy={ping.y}
                        r={isSelected ? 6 : 4}
                        className="ping-point"
                      />
                      {/* Ping label */}
                      <text
                        x={ping.x + 9}
                        y={ping.y + 4}
                        className="ping-svg-label"
                      >
                        {ping.sector}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Radar Telemetry Sidebar */}
            <div className="radar-telemetry-panel">
              <div className="telemetry-box">
                <span className="telemetry-tag">SELECTED TARGET TELEMETRY</span>
                <div className="telemetry-detail-item">
                  <span className="detail-label">IDENTIFIER:</span>
                  <span className="detail-value highlight-cyan">{activePing.label}</span>
                </div>
                <div className="telemetry-detail-item">
                  <span className="detail-label">SECTOR:</span>
                  <span className="detail-value">{activePing.sector}</span>
                </div>
                <div className="telemetry-detail-item">
                  <span className="detail-label">DISPOSITION:</span>
                  <span className={`detail-value ${activePing.type === 'alert' ? 'highlight-warning' : 'highlight-online'}`}>
                    {activePing.status}
                  </span>
                </div>
                <div className="telemetry-detail-item">
                  <span className="detail-label">COORDINATES:</span>
                  <span className="detail-value mono">
                    [X:{activePing.x} | Y:{activePing.y}]
                  </span>
                </div>
              </div>

              {/* Grid Live Statistics */}
              <div className="telemetry-stats-grid">
                <div className="telemetry-stat">
                  <span className="stat-label">SIGNALS SCANNED</span>
                  <span className="stat-value">{pulseCount.toLocaleString()}</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-label">GRID INTEGRITY</span>
                  <span className="stat-value highlight-online">99.8%</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-label">ACTIVE BLIPS</span>
                  <span className="stat-value highlight-cyan">{RADAR_PINGS.length}</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-label">INTERCEPT CHANCE</span>
                  <span className="stat-value">INSTANT</span>
                </div>
              </div>

              {/* Manual Scan Action */}
              <button
                type="button"
                className="btn btn-secondary radar-scan-btn"
                onClick={handleManualScan}
                aria-label="Force network sweep"
              >
                <RefreshCw size={14} aria-hidden="true" />
                <span>PULSE GUARDIAN BEACON</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
