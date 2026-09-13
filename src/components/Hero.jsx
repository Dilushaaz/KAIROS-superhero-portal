import React from 'react';
import { Radio, Compass, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        {/* Left Column: Storytelling & Action Content */}
        <div className="hero-content">
          {/* Status Badge: SYSTEM ONLINE // SECTOR 07 GUARDIAN */}
          <div className="status-bar">
            <div className="status-chip">
              <span className="status-dot" aria-hidden="true"></span>
              <span>SYSTEM ONLINE // SECTOR 07 GUARDIAN</span>
            </div>
          </div>

          <div className="hero-title-group">
            <span className="hero-subtitle">THE MOMENT KEEPER</span>
            <h1 id="hero-heading" className="hero-headline">KAIROS</h1>
            <p className="hero-tagline">“Every moment has a point.”</p>
          </div>

          <p className="hero-description">
            Kairos does not control time. Kairos perceives the significant moment inside a confusing situation — the moment when everything changed or when someone needs help.
          </p>

          <div className="hero-actions">
            <a href="#moment-engine" className="btn btn-primary">
              <Compass size={16} aria-hidden="true" />
              <span>ENTER THE MOMENT ENGINE</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#signal-vault" className="btn btn-secondary">
              <Radio size={16} aria-hidden="true" />
              <span>SEND A SIGNAL</span>
            </a>
          </div>
        </div>

        {/* Right Column: Moment Engine Command HUD Centerpiece */}
        <div className="hero-visual-wrapper" aria-label="Moment Engine Command Centerpiece with orbital rings and glowing central core">
          {/* Futuristic HUD Framing Brackets */}
          <div className="hud-bracket hud-tl" aria-hidden="true"></div>
          <div className="hud-bracket hud-tr" aria-hidden="true"></div>
          <div className="hud-bracket hud-bl" aria-hidden="true"></div>
          <div className="hud-bracket hud-br" aria-hidden="true"></div>

          {/* Telemetry Indicator */}
          <div className="hud-telemetry-top">
            MOMENT ENGINE // LIVE RECEPTOR
          </div>

          <div className="moment-engine-orb">
            {/* Holographic Radar Sweep */}
            <div className="hud-radar-sweep" aria-hidden="true"></div>

            {/* Concentric Rotating Temporal Rings */}
            <div className="temporal-ring ring-outer"></div>
            <div className="temporal-ring ring-mid"></div>
            <div className="temporal-ring ring-inner"></div>

            {/* Radial Expanding Signal Wave */}
            <div className="ring-pulse"></div>

            {/* Orbiting Signal Carrier with moving beacon */}
            <div className="orbital-carrier" aria-hidden="true">
              <div className="signal-beacon" title="Moving Signal Telemetry"></div>
            </div>

            {/* Coordinate Connection Nodes */}
            <div className="orbit-node node-1" title="Signal Node Alpha"></div>
            <div className="orbit-node node-2" title="Signal Node Beta"></div>
            <div className="orbit-node node-3" title="Entropy Vector"></div>
            <div className="orbit-node node-4" title="Chrono Link"></div>

            {/* Glowing Central Core: The Moment That Matters */}
            <div className="moment-center">
              <div className="moment-center-core"></div>
              <div className="moment-label-badge">
                THE MOMENT THAT MATTERS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
