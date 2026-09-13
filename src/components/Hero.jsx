import React from 'react';
import { Radio, Play, ArrowRight, Activity, ShieldCheck, Zap, ChevronDown, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Kairos3DGuardian from './Kairos3DGuardian';
import HolographicGlobe from './HolographicGlobe';
import { playClickSound, startCinematicTheme } from '../utils/soundService';

export default function Hero({ onOpenSignal }) {
  const handleSignal = () => {
    playClickSound();
    startCinematicTheme();
    if (onOpenSignal) onOpenSignal();
  };

  const handleWatchLore = (e) => {
    e.preventDefault();
    playClickSound();
    startCinematicTheme();
    const comicEl = document.getElementById('comic-story');
    if (comicEl) {
      comicEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section cinematic-hero-ref" aria-labelledby="hero-heading">
      {/* City Atmosphere Backdrop */}
      <div className="hero-city-atmosphere" aria-hidden="true"></div>

      <div className="container">
        {/* Upper Grid: Manifesto & 3D Character Showcase */}
        <div className="hero-grid-upper">
          {/* Left Column: Hero Manifesto */}
          <div className="hero-content-ref">
            <span className="hero-eyebrow-tag">
              A SAFER TOMORROW — STARTS WITH YOU
            </span>

            <h1 id="hero-heading" className="hero-title-kairos">
              KAIROS
            </h1>

            <span className="hero-subtitle-guardian">
              THE GUARDIAN LISTENS
            </span>

            <p className="hero-lead-manifesto">
              Report. Connect. Create Change.<br />
              KAIROS is your AI-powered guardian, bridging the gap between people and a safer tomorrow.
            </p>

            {/* Dual CTAs matching reference */}
            <div className="hero-action-buttons">
              <button
                type="button"
                className="btn btn-primary-amber"
                onClick={handleSignal}
                aria-label="Signal KAIROS priority messenger"
              >
                <span>SIGNAL KAIROS</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <a
                href="#comic-story"
                className="btn btn-secondary-glass"
                onClick={handleWatchLore}
                aria-label="Watch KAIROS Lore and Story Chronicles"
              >
                <Play size={15} fill="currentColor" aria-hidden="true" />
                <span>WATCH LORE</span>
              </a>
            </div>

            {/* High-Impact Numerical Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-box">
                <span className="stat-number">24/7</span>
                <span className="stat-caption">GUARDIAN ONLINE</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">∞</span>
                <span className="stat-caption">CITIZENS PROTECTED</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number"><Activity size={24} style={{ display: 'inline' }} /></span>
                <span className="stat-caption">REAL IMPACT</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Superhero Showcase */}
          <div className="hero-guardian-viewport">
            <Kairos3DGuardian />
          </div>
        </div>

        {/* Lower Grid: Integrated Command Center & Holographic Globe */}
        <div className="hero-command-center-grid">
          {/* Left Card: 3D Holographic Defense Radar */}
          <div className="glass-card command-card radar-card">
            <div className="command-card-header">
              <h3 className="command-card-title">KAIROS DEFENSE RADAR</h3>
              <span className="command-card-sub">GLOBAL GUARDIAN NETWORK</span>
            </div>

            <div className="radar-globe-flex">
              <div className="globe-container">
                <HolographicGlobe />
              </div>

              <div className="radar-metrics-list">
                <div className="radar-metric-item">
                  <span className="metric-indicator dot-green"></span>
                  <span className="metric-num">12</span>
                  <span className="metric-name">SAFE ZONES</span>
                </div>
                <div className="radar-metric-item">
                  <span className="metric-indicator dot-red"></span>
                  <span className="metric-num">3</span>
                  <span className="metric-name">ACTIVE ALERTS</span>
                </div>
                <div className="radar-metric-item">
                  <span className="metric-indicator dot-cyan"></span>
                  <span className="metric-num">47</span>
                  <span className="metric-name">CITIZENS HELPED</span>
                </div>

                <div className="radar-scanning-audio">
                  <div className="frequency-bars" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <span className="scanning-text">SCANNING...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Live City Feed */}
          <div className="glass-card command-card feed-card">
            <div className="command-card-header">
              <h3 className="command-card-title">LIVE CITY FEED</h3>
              <span className="command-card-sub">REAL-TIME SIGNAL ACTIVITY</span>
            </div>

            <div className="feed-content-split">
              <div className="feed-activity-list">
                <div className="feed-item">
                  <div className="feed-icon-badge green">
                    <CheckCircle size={13} />
                  </div>
                  <div className="feed-text-block">
                    <span className="feed-title">General inquiry resolved</span>
                    <span className="feed-location">Sector 7</span>
                  </div>
                  <span className="feed-time">2m ago</span>
                </div>

                <div className="feed-item">
                  <div className="feed-icon-badge amber">
                    <AlertCircle size={13} />
                  </div>
                  <div className="feed-text-block">
                    <span className="feed-title">Assistance request received</span>
                    <span className="feed-location">Riverside</span>
                  </div>
                  <span className="feed-time">5m ago</span>
                </div>

                <div className="feed-item">
                  <div className="feed-icon-badge red">
                    <Zap size={13} />
                  </div>
                  <div className="feed-text-block">
                    <span className="feed-title">Critical signal dispatched</span>
                    <span className="feed-location">Central District</span>
                  </div>
                  <span className="feed-time">8m ago</span>
                </div>

                <div className="feed-item">
                  <div className="feed-icon-badge green">
                    <ShieldCheck size={13} />
                  </div>
                  <div className="feed-text-block">
                    <span className="feed-title">Community support connected</span>
                    <span className="feed-location">West Zone</span>
                  </div>
                  <span className="feed-time">12m ago</span>
                </div>
              </div>

              {/* City Preview Thumbnail Card */}
              <div className="feed-thumbnail-box">
                <div className="thumbnail-art">
                  <div className="skyline-silhouette"></div>
                  <span className="thumbnail-caption">
                    STRONGER COMMUNITIES<br />SAFER TOMORROWS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Explorer Indicator */}
        <div className="hero-scroll-indicator">
          <a href="#comic-story" className="scroll-pill" onClick={handleWatchLore}>
            <span className="mouse-wheel-icon"></span>
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} />
          </a>
          <span className="guardian-motto">KAIROS | GUARDIANS RISE WITH PEOPLE</span>
        </div>
      </div>
    </section>
  );
}
