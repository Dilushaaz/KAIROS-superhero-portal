import React from 'react';
import { Cpu, Activity, Search, Target, ShieldCheck } from 'lucide-react';

const timelineSteps = [
  {
    step: '01',
    title: 'EVENT DETECTED',
    desc: 'Incoming distress or incident telemetry registers across the perimeter sensors.',
    icon: Activity,
    badge: 'STAGE: INGESTION',
    status: 'CONTINUOUS'
  },
  {
    step: '02',
    title: 'SIGNAL ANALYZED',
    desc: 'Deep pattern recognition separates environmental noise from the critical disturbance.',
    icon: Search,
    badge: 'STAGE: DECOMPOSITION',
    status: 'SYNAPSE_OK'
  },
  {
    step: '03',
    title: 'TURNING POINT IDENTIFIED',
    desc: 'Kairos isolates the moment where the situation changes.',
    icon: Target,
    badge: 'STAGE: CONVERGENCE',
    status: 'ISOLATED'
  },
  {
    step: '04',
    title: 'MOMENT PRESERVED',
    desc: 'The critical signal is secured for response and future analysis.',
    icon: ShieldCheck,
    badge: 'STAGE: ANCHOR',
    status: 'SECURE'
  }
];

export default function MomentEngine() {
  return (
    <section id="moment-engine" className="section" aria-labelledby="moment-engine-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={13} aria-hidden="true" />
            <span>VERTICAL PIPELINE</span>
          </div>
          <h2 id="moment-engine-heading" className="section-title">MOMENT ENGINE</h2>
          <p className="section-description">
            The four-stage temporal cognitive architecture that isolates decisive turning points from surrounding noise.
          </p>
        </div>

        <div className="timeline-container">
          {timelineSteps.map((item, index) => {
            const IconComponent = item.icon;
            const isLast = index === timelineSteps.length - 1;

            return (
              <div key={item.step} className="timeline-step">
                <div className="timeline-marker-col">
                  <div className="timeline-node" aria-hidden="true">
                    <IconComponent size={20} />
                  </div>
                  {!isLast && <div className="timeline-connector"></div>}
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-step-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent-cyan)', fontWeight: '700' }}>
                        STEP // {item.step}
                      </span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                    <span className="timeline-step-tag">{item.badge}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                      STATUS: {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
