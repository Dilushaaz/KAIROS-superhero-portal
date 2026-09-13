import React, { useState } from 'react';
import { BookOpen, Radio, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { playClickSound, startCinematicTheme } from '../utils/soundService';

const COMIC_PANELS = [
  {
    id: 'panel-01',
    num: 'PANEL 01',
    title: 'THE SIGNAL',
    caption: 'KAIROS was built to listen when no one else could.',
    quote: '“In the deafening noise of the metropolis, critical turning points were slipping into silence.”',
    artTag: 'NEO-VERIDIA // CRISIS HOUR',
    accent: 'cyan',
    icon: Zap,
    artDesc: 'Emergency telemetry pulses cascade through an overwhelmed metropolitan skyline.'
  },
  {
    id: 'panel-02',
    num: 'PANEL 02',
    title: 'THE AWAKENING',
    caption: 'One signal changed everything.',
    quote: '“When standard algorithms faltered, the Moment Core ignited with an unprecedented spark of guardian consciousness.”',
    artTag: 'MOMENT CORE // ONLINE',
    accent: 'cyan',
    icon: Sparkles,
    artDesc: 'The temporal core blazes to life as cyan energy arcs through obsidian armor.'
  },
  {
    id: 'panel-03',
    num: 'PANEL 03',
    title: 'THE GUARDIAN',
    caption: 'Not to control people. To protect them.',
    quote: '“Power without empathy is an oppressor. KAIROS chose to be a shield, not a sovereign.”',
    artTag: 'DIRECTIVE // SHIELD PROTOCOL',
    accent: 'violet',
    icon: Shield,
    artDesc: 'A colossal holographic barrier shields vulnerable sector coordinates.'
  },
  {
    id: 'panel-04',
    num: 'PANEL 04',
    title: 'THE MISSION',
    caption: 'Every voice becomes a signal.',
    quote: '“No distress call is too faint. No grievance is ignored by the Guardian Network.”',
    artTag: 'TRANSMISSION // ACTIVE',
    accent: 'cyan',
    icon: Radio,
    artDesc: 'Beacons of human distress connect directly to the guardian receptor grid.',
    hasCTA: true
  },
  {
    id: 'panel-05',
    num: 'PANEL 05',
    title: 'THE RESPONSE',
    caption: 'Every signal deserves a response.',
    quote: '“Through the Moment Engine, chaotic inputs crystallize into instantaneous priority intervention.”',
    artTag: 'TELEMETRY // ROUTED',
    accent: 'amber',
    icon: Zap,
    artDesc: 'Signals are categorized, encrypted, and dispatched at temporal velocity.'
  },
  {
    id: 'panel-06',
    num: 'PANEL 06',
    title: 'THE FUTURE',
    caption: 'People. Safety. Tomorrow.',
    quote: '“A perpetual sentinel watching over human inflection points, ensuring tomorrow arrives safely.”',
    artTag: 'DAWN // SECTOR 07',
    accent: 'cyan',
    icon: Sparkles,
    artDesc: 'KAIROS stands triumphant atop the guardian spire, watching the sunrise.'
  }
];

export default function ComicStory({ onOpenSignal }) {
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const handlePanelClick = (index) => {
    playClickSound();
    startCinematicTheme();
    setActivePanelIndex(index);
  };

  const handleNext = () => {
    playClickSound();
    startCinematicTheme();
    setActivePanelIndex((prev) => (prev + 1) % COMIC_PANELS.length);
  };

  const handlePrev = () => {
    playClickSound();
    startCinematicTheme();
    setActivePanelIndex((prev) => (prev - 1 + COMIC_PANELS.length) % COMIC_PANELS.length);
  };

  const handleSignalClick = () => {
    playClickSound();
    startCinematicTheme();
    if (onOpenSignal) onOpenSignal();
  };

  return (
    <section id="comic-story" className="section comic-story-section" aria-labelledby="story-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={13} aria-hidden="true" />
            <span>CINEMATIC GRAPHIC CHRONICLE</span>
          </div>
          <h2 id="story-heading" className="section-title">THE KAIROS CHRONICLES</h2>
          <p className="section-description">
            The origin journey of the Moment Keeper — from an experimental listener to humanity's vigilant guardian.
          </p>
        </div>

        {/* Comic Storyboard Layout */}
        <div className="comic-storyboard-wrapper">
          {/* Active Featured Spotlight Panel */}
          <div className="comic-spotlight-frame glass-card">
            <div className="comic-halftone-overlay" aria-hidden="true"></div>
            
            <div className="spotlight-header">
              <span className="comic-issue-stamp">ISSUE #01 // ORIGIN ARC</span>
              <span className="spotlight-num">{COMIC_PANELS[activePanelIndex].num}</span>
            </div>

            <div className="spotlight-body">
              <div className="spotlight-art-container">
                {/* Comic Speed Lines Graphic Background */}
                <div className="comic-speed-lines" aria-hidden="true"></div>

                <div className="art-center-content">
                  <div className="art-icon-circle">
                    {React.createElement(COMIC_PANELS[activePanelIndex].icon, {
                      size: 40,
                      className: `comic-art-icon ${COMIC_PANELS[activePanelIndex].accent}`
                    })}
                  </div>
                  <span className="art-tag-label">{COMIC_PANELS[activePanelIndex].artTag}</span>
                  <p className="art-desc-text">{COMIC_PANELS[activePanelIndex].artDesc}</p>
                </div>
              </div>

              <div className="spotlight-narrative">
                <div className="comic-caption-box">
                  <span className="caption-label">NARRATIVE CHRONICLE</span>
                  <h3 className="caption-title">{COMIC_PANELS[activePanelIndex].title}</h3>
                  <p className="caption-lead">“{COMIC_PANELS[activePanelIndex].caption}”</p>
                </div>

                <blockquote className="comic-dialogue-bubble">
                  {COMIC_PANELS[activePanelIndex].quote}
                </blockquote>

                {/* Interactive CTA within story */}
                <div className="spotlight-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleSignalClick}
                    aria-label="Send a priority signal to KAIROS"
                  >
                    <Radio size={14} aria-hidden="true" />
                    <span>SIGNAL KAIROS NOW</span>
                  </button>

                  <div className="comic-step-nav">
                    <button
                      type="button"
                      className="comic-nav-arrow"
                      onClick={handlePrev}
                      aria-label="Previous Comic Panel"
                    >
                      ←
                    </button>
                    <span className="comic-step-counter">
                      {activePanelIndex + 1} / {COMIC_PANELS.length}
                    </span>
                    <button
                      type="button"
                      className="comic-nav-arrow"
                      onClick={handleNext}
                      aria-label="Next Comic Panel"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Comic Panel Strip / Thumbnails */}
          <div className="comic-strip-grid" role="tablist" aria-label="Comic Panels Navigation">
            {COMIC_PANELS.map((panel, idx) => {
              const isActive = activePanelIndex === idx;
              const IconComponent = panel.icon;

              return (
                <button
                  key={panel.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`comic-panel-card glass-card ${isActive ? 'active' : ''}`}
                  onClick={() => handlePanelClick(idx)}
                >
                  <div className="panel-card-badge">
                    <span>{panel.num}</span>
                    <IconComponent size={12} aria-hidden="true" />
                  </div>

                  <h4 className="panel-card-title">{panel.title}</h4>
                  <p className="panel-card-snippet">{panel.caption}</p>

                  <div className="panel-card-hover-cue">
                    <span>INSPECT PANEL</span>
                    <ArrowRight size={11} aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
