import React, { useState } from 'react';
import { Play, ArrowRight, Activity, ShieldCheck, ChevronDown, Compass, Shield, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import Kairos3DGuardian from './Kairos3DGuardian';
import HolographicGlobe from './HolographicGlobe';
import { playClickSound, startCinematicTheme, playDispatchSound, playThreatLevelSound } from '../utils/soundService';
import { sendPrioritySignal } from '../utils/emailService';
import { saveSignal } from '../utils/vaultService';

export default function Hero({ onOpenSignal }) {
  // On-Page Direct Signal Dispatch state
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    grievance: '',
    threatLevel: 'URGENT'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleThreatChange = (e) => {
    const newLvl = e.target.value;
    setFormState((prev) => ({ ...prev, threatLevel: newLvl }));
    playThreatLevelSound(newLvl);
  };

  const handleDirectDispatch = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formState.name.trim() || !formState.email.trim() || !formState.grievance.trim()) {
      setSubmitResult({
        success: false,
        message: 'Please provide at least your name, email, and description of your grievance.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);
    playClickSound();

    const timestamp = new Date().toLocaleString();
    const payload = {
      name: formState.name.trim(),
      age: formState.age.trim() || 'Unspecified',
      location: formState.location.trim() || 'Sector 07 // Veridia Core',
      email: formState.email.trim(),
      grievance: formState.grievance.trim(),
      distressLevel: formState.threatLevel,
      timestamp
    };

    try {
      const res = await sendPrioritySignal(payload);
      if (res.success) {
        saveSignal(payload);
        playDispatchSound();
        setSubmitResult({
          success: true,
          message: 'Priority signal transmitted and encrypted into the KAIROS Guardian Vault.'
        });
        setFormState({
          name: '',
          age: '',
          location: '',
          email: '',
          grievance: '',
          threatLevel: 'URGENT'
        });
      } else {
        setSubmitResult({
          success: false,
          message: 'Signal transmission interrupted. Please retry or connect via KAIROS AI Chat.'
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'Transmission error encountered.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignal = () => {
    playClickSound();
    startCinematicTheme();
    if (onOpenSignal) onOpenSignal();
  };

  const handleWatchStory = (e) => {
    e.preventDefault();
    playClickSound();
    startCinematicTheme();
    const comicEl = document.getElementById('comic-story');
    if (comicEl) {
      comicEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRadar = (e) => {
    e.preventDefault();
    playClickSound();
    const radarEl = document.getElementById('threat-radar');
    if (radarEl) {
      radarEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section cinematic-hero-ref" aria-labelledby="hero-heading">
      {/* Cinematic Megacity Atmospheric Backdrop */}
      <div className="hero-city-atmosphere" aria-hidden="true"></div>

      <div className="container">
        {/* Upper Grid: Manifesto & 3D Character Showcase */}
        <div className="hero-grid-upper">
          {/* Left Column: Hero Manifesto */}
          <div className="hero-content-ref">
            <span className="hero-eyebrow-tag">
              A SAFER TOMORROW BEGINS WITH YOU
            </span>

            {/* Chiseled KAIROS Headline with Embedded Wing Chevron Motif */}
            <h1 id="hero-heading" className="hero-title-kairos">
              KAI<span className="logo-chevron">R</span>OS
            </h1>

            <span className="hero-subtitle-guardian">
              ALWAYS WATCHING. ALWAYS WITH YOU.
            </span>

            <p className="hero-lead-manifesto">
              KAIROS is a global guardian network built to protect, support and empower every individual. Report. Connect. Stay Safe. Because every voice matters.
            </p>

            {/* Dual Action Buttons matching reference */}
            <div className="hero-action-buttons">
              <button
                type="button"
                className="btn btn-primary-blue"
                onClick={handleSignal}
                aria-label="Send a priority signal to KAIROS"
              >
                <span>SEND A SIGNAL</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <a
                href="#comic-story"
                className="btn btn-secondary-glass"
                onClick={handleWatchStory}
                aria-label="Explore KAIROS story chronicles"
              >
                <Play size={14} fill="currentColor" aria-hidden="true" />
                <span>OUR STORY</span>
              </a>
            </div>

            {/* High-Impact Numerical Stats Row matching reference */}
            <div className="hero-stats-row">
              <div className="hero-stat-box">
                <span className="stat-number">127</span>
                <span className="stat-caption">Signals Received</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">98</span>
                <span className="stat-caption">People Supported</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">24/7</span>
                <span className="stat-caption">Global Monitoring</span>
              </div>
            </div>
          </div>

          {/* Center-Right Column: 3D Superhero Showcase */}
          <div className="hero-guardian-viewport">
            <Kairos3DGuardian />
          </div>
        </div>

        {/* Scroll Explorer Indicator */}
        <div className="hero-scroll-indicator">
          <a href="#comic-story" className="scroll-pill" onClick={handleWatchStory}>
            <span className="mouse-wheel-icon"></span>
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} />
          </a>
        </div>

        {/* Lower Grid: Integrated 3-Column Command Center matching reference */}
        <div className="hero-command-center-grid">
          {/* Column 1: Live Global Radar */}
          <div className="glass-card command-card radar-card">
            <div className="command-card-header">
              <div className="card-header-icon blue-badge">
                <Compass size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="command-card-title">LIVE GLOBAL RADAR</h3>
                <span className="command-card-sub">Real-time community signals</span>
              </div>
            </div>

            <div className="radar-globe-flex">
              <div className="globe-container">
                <HolographicGlobe />
              </div>

              {/* Threat legend matching reference */}
              <div className="radar-legend-bar">
                <span className="legend-dot dot-low"></span> <span>Low</span>
                <span className="legend-dot dot-med"></span> <span>Medium</span>
                <span className="legend-dot dot-high"></span> <span>High</span>
                <span className="legend-dot dot-crit"></span> <span>Critical</span>
              </div>
            </div>

            <div className="command-card-action">
              <a href="#threat-radar" className="btn btn-outline-cyan" onClick={handleExploreRadar}>
                <span>EXPLORE RADAR</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Send a Signal (Direct On-Page Dispatch Form) */}
          <div className="glass-card command-card form-card">
            <div className="command-card-header">
              <div className="card-header-icon cyan-badge">
                <Shield size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="command-card-title">SEND A SIGNAL</h3>
                <span className="command-card-sub">You are not alone. Your voice matters.</span>
              </div>
            </div>

            <form className="direct-signal-form" onSubmit={handleDirectDispatch}>
              <div className="form-row-split">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="kairos-input"
                />
                <input
                  type="text"
                  name="age"
                  value={formState.age}
                  onChange={handleInputChange}
                  placeholder="Your Age"
                  className="kairos-input"
                />
              </div>

              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                placeholder="Your Location"
                className="kairos-input"
              />

              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="kairos-input"
              />

              <textarea
                name="grievance"
                value={formState.grievance}
                onChange={handleInputChange}
                placeholder="Describe Your Grievance"
                required
                rows={2}
                className="kairos-textarea"
              />

              <div className="form-threat-select-wrapper">
                <ShieldCheck size={14} className="threat-select-icon" aria-hidden="true" />
                <select
                  name="threatLevel"
                  value={formState.threatLevel}
                  onChange={handleThreatChange}
                  className="kairos-select"
                  aria-label="Select Signal Threat Priority"
                >
                  <option value="LOW">🟢 Low Threat Priority</option>
                  <option value="URGENT">🟡 Urgent Threat Priority</option>
                  <option value="CRITICAL">🔴 Critical Threat Priority</option>
                </select>
              </div>

              {submitResult && (
                <div className={`form-feedback-banner ${submitResult.success ? 'success' : 'error'}`}>
                  {submitResult.success ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                  <span>{submitResult.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary-blue btn-full"
              >
                <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND SIGNAL'}</span>
                <Send size={15} aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Column 3: Global Threat Status */}
          <div className="glass-card command-card status-card">
            <div className="command-card-header">
              <div className="card-header-icon blue-badge">
                <Activity size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="command-card-title">GLOBAL THREAT STATUS</h3>
                <div className="threat-status-line">
                  <span className="status-dot dot-green"></span>
                  <span className="threat-status-text">STABLE</span>
                  <span className="threat-sub">No major threats detected</span>
                </div>
              </div>
            </div>

            {/* Holographic World Map Wireframe */}
            <div className="threat-map-container">
              <div className="holographic-map-mesh" aria-hidden="true"></div>
              <div className="map-scan-beam" aria-hidden="true"></div>
            </div>

            {/* Key Metrics matching reference */}
            <div className="threat-metrics-list">
              <div className="threat-metric-row">
                <span className="metric-large">1,200+</span>
                <span className="metric-desc">Cities Covered</span>
              </div>
              <div className="threat-metric-row">
                <span className="metric-large">500K+</span>
                <span className="metric-desc">People Protected</span>
              </div>
              <div className="threat-metric-row">
                <span className="metric-large">&lt; 60s</span>
                <span className="metric-desc">Average Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
