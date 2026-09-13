import React from 'react';
import { Compass, Radio, ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-heading">
      <div className="container">
        <div className="glass-card final-cta-card">
          <div className="final-cta-tag">
            <Sparkles size={14} aria-hidden="true" />
            <span>KAIROS GUARDIAN INITIATIVE</span>
          </div>

          <h2 id="final-cta-heading" className="final-cta-heading">
            EVERY MOMENT MATTERS.
          </h2>

          <p className="final-cta-sub">
            When the world becomes noise, Kairos finds the moment that matters.
          </p>

          <div className="final-cta-actions">
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
      </div>
    </section>
  );
}
