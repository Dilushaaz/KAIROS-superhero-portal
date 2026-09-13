import React from 'react';
import { Shield, Activity, Zap, CheckCircle2 } from 'lucide-react';

const metrics = [
  {
    id: 'moments-protected',
    label: 'Moments Protected',
    value: '14,892',
    sub: 'Turning points shielded',
    highlight: 'cyan',
    icon: Shield
  },
  {
    id: 'signals-processed',
    label: 'Signals Processed',
    value: '1,420,850',
    sub: 'Telemetry streams scanned',
    highlight: '',
    icon: Activity
  },
  {
    id: 'response-time',
    label: 'Signal Response Time',
    value: '0.04ms',
    sub: 'Perception latency',
    highlight: 'cyan',
    icon: Zap
  },
  {
    id: 'network-status',
    label: 'Guardian Network Status',
    value: 'ACTIVE 100%',
    sub: 'All sectors operational',
    highlight: '',
    icon: CheckCircle2
  }
];

export default function DefenseMetrics() {
  return (
    <section className="defense-metrics-section" aria-labelledby="metrics-heading">
      <div className="container">
        <div className="metrics-header">
          <div className="metrics-title-block">
            <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
              <Activity size={13} aria-hidden="true" />
              <span>SYSTEM TELEMETRY</span>
            </div>
            <h2 id="metrics-heading">LIVE DEFENSE METRICS</h2>
            <p>Real-time fictional system telemetry from the Kairos Guardian Network.</p>
          </div>

          <div className="status-indicator">
            <span className="status-dot" aria-hidden="true"></span>
            <span>SECTOR 07 FEED: CONTINUOUS</span>
          </div>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className="metric-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="metric-label">{metric.label}</span>
                  <Icon size={16} color="var(--color-accent-cyan)" aria-hidden="true" />
                </div>
                <div className={`metric-value ${metric.highlight}`}>
                  {metric.value}
                </div>
                <div className="metric-sub">
                  <span className="status-dot" style={{ width: '5px', height: '5px' }} aria-hidden="true"></span>
                  <span>{metric.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
