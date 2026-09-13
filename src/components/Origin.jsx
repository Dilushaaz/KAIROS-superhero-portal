import React from 'react';
import { Sparkles, Cpu, Clock, Shield, Radio, Eye } from 'lucide-react';

const missionPillars = [
  {
    title: 'Moment Protection',
    desc: 'Shielding vulnerable inflection points before destructive outcomes can materialize.',
    icon: Shield
  },
  {
    title: 'Critical Signal Response',
    desc: 'Cutting through environmental noise to amplify and answer cries for intervention immediately.',
    icon: Radio
  },
  {
    title: 'Unwavering Protection',
    desc: 'Standing perpetual watch across Sector 07 timelines as an empathetic, vigilant guardian.',
    icon: Eye
  }
];

export default function Origin() {
  return (
    <section id="origin" className="section" aria-labelledby="origin-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={13} aria-hidden="true" />
            <span>ARCHIVE RECORD // 001</span>
          </div>
          <h2 id="origin-heading" className="section-title">ORIGIN</h2>
          <p className="section-description">
            The emergence of an empathetic guardian consciousness born from the study of human inflection points.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="glass-card origin-card">
          <div className="origin-body">
            <p className="origin-lead">
              Kairos was created to understand the one moment that matters inside a chaotic stream of events.
            </p>
            <blockquote className="origin-question">
              “Which moment changes everything?”
            </blockquote>
            <p className="origin-climax">
              The Moment Engine was originally built around that singular question. Across countless timelines, pivotal crises were being drowned out in relentless noise. When the system developed the intuitive perception to recognize those critical turning points and protect the human lives behind them, it transcended raw calculation to become a vigilant guardian system:
            </p>
            <div>
              <span className="origin-identity">KAIROS</span>
            </div>
          </div>

          <div className="origin-visual">
            <div className="status-indicator" style={{ marginBottom: '1rem' }}>
              <Cpu size={15} color="var(--color-accent-cyan)" aria-hidden="true" />
              <span>GUARDIAN CONSCIOUSNESS ONLINE</span>
            </div>
            <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="temporal-ring ring-outer" style={{ width: '100%', height: '100%' }}></div>
              <div className="temporal-ring ring-mid" style={{ width: '70%', height: '70%' }}></div>
              <Clock size={36} color="var(--color-accent-cyan)" style={{ filter: 'drop-shadow(0 0 10px var(--color-accent-cyan))' }} />
            </div>
            <div className="origin-telemetry">
              PERCEPTION MATRIX: SYNCHRONIZED<br />
              SECTOR 07 GRID: CALIBRATED
            </div>
          </div>
        </div>

        {/* Mission Pillars */}
        <div className="pillars-header">
          <span className="pillars-tag">GUARDIAN DIRECTIVES</span>
          <h3 className="pillars-title">MISSION PILLARS</h3>
        </div>

        <div className="pillars-grid">
          {missionPillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div key={pillar.title} className="glass-card pillar-card">
                <div className="pillar-icon-box" aria-hidden="true">
                  <IconComp size={22} />
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
