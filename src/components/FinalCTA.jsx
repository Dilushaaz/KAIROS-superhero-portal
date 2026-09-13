import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { playClickSound, startCinematicTheme } from '../utils/soundService';

export default function FinalCTA({ onOpenSignal }) {
  const handleJoinMovement = () => {
    playClickSound();
    startCinematicTheme();
    if (onOpenSignal) onOpenSignal();
  };

  return (
    <section className="movement-section" aria-labelledby="movement-heading">
      <div className="movement-panorama-backdrop" aria-hidden="true">
        <div className="guardian-overlook-silhouette"></div>
        <div className="city-spire-glows"></div>
      </div>

      <div className="container movement-inner">
        <div className="movement-content-block">
          <div className="movement-eyebrow">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>MORE THAN TECHNOLOGY</span>
          </div>

          <h2 id="movement-heading" className="movement-title">
            A MOVEMENT
          </h2>

          <p className="movement-manifesto-text">
            KAIROS isn't just a platform. It's a promise — that no one has to face the dark alone. Together, we build a world where people are safer, stronger and kinder.
          </p>
        </div>

        <div className="movement-action-block">
          <button
            type="button"
            className="btn btn-primary-blue movement-btn"
            onClick={handleJoinMovement}
            aria-label="Join the KAIROS movement and send signal"
          >
            <span>JOIN THE MOVEMENT</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
