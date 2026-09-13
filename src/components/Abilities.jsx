import React from 'react';
import { Eye, Compass, GitMerge, Lock, Shield } from 'lucide-react';

const abilities = [
  {
    id: 'moment-sight',
    title: 'MOMENT SIGHT',
    desc: 'Perceives the critical moment hidden inside a chaotic story.',
    icon: Eye,
    tag: 'SENSORY PERCEPTION',
    color: 'var(--color-accent-cyan)'
  },
  {
    id: 'possibility-sense',
    title: 'POSSIBILITY SENSE',
    desc: 'Maps possible outcomes surrounding a moment.',
    icon: Compass,
    tag: 'PROBABILITY MATRIX',
    color: 'var(--color-accent-cyan)'
  },
  {
    id: 'chrono-link',
    title: 'CHRONO-LINK',
    desc: 'Connects events, people and signals across a timeline.',
    icon: GitMerge,
    tag: 'SYNAPSE NETWORK',
    color: 'var(--color-accent-violet)'
  },
  {
    id: 'moment-lock',
    title: 'MOMENT LOCK',
    desc: 'Preserves an important signal so it cannot be lost.',
    icon: Lock,
    tag: 'INTEGRITY SHIELD',
    color: 'var(--color-accent-cyan)'
  }
];

export default function Abilities() {
  return (
    <section id="abilities" className="section" aria-labelledby="abilities-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Shield size={13} aria-hidden="true" />
            <span>GUARDIAN CAPABILITIES</span>
          </div>
          <h2 id="abilities-heading" className="section-title">POWERS &amp; ABILITIES</h2>
          <p className="section-description">
            Advanced sensory and temporal faculties deployed by Kairos to isolate pivotal moments and safeguard timelines.
          </p>
        </div>

        <div className="abilities-grid">
          {abilities.map((ability) => {
            const IconComponent = ability.icon;
            return (
              <article key={ability.id} className="glass-card ability-card">
                <div className="ability-icon-box" aria-hidden="true">
                  <IconComponent size={24} />
                </div>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.68rem', 
                  color: ability.color, 
                  letterSpacing: '0.12em', 
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase'
                }}>
                  {ability.tag}
                </span>
                <h3 className="ability-title">{ability.title}</h3>
                <p className="ability-desc">{ability.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
