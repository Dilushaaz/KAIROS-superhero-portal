/**
 * KAIROS Signal Vault Service
 * LocalStorage-based demonstration archive for KAIROS priority signals.
 *
 * NOTE: This is a browser demonstration/admin feature and does not provide
 * genuine hardware encryption or cryptographic security.
 */

const STORAGE_KEY = 'kairos_signal_vault';

// Sample fictional telemetry seeded if no records exist yet
const INITIAL_DEMO_SIGNALS = [
  {
    id: 'KRS-SIG-1042',
    name: 'Valerius Vance',
    age: '34',
    location: 'Sector 07 // Neo-Veridia Core',
    email: 'v.vance@guardian-grid.net',
    grievance: 'Temporal flux rupture detected near Sector 07 sub-station. Power oscillations threatening defensive array.',
    distressLevel: 'CRITICAL',
    timestamp: '2026-09-13 21:15:40',
    status: 'DISPATCHED'
  },
  {
    id: 'KRS-SIG-1039',
    name: 'Dr. Aaron Chen',
    age: '42',
    location: 'Aegis Orbital Array // Outpost 3',
    email: 'chen.telemetry@kairos-defense.org',
    grievance: 'Scheduled calibration drift in Moment Engine telemetry. Requesting cross-sector beacon synchronization.',
    distressLevel: 'LOW',
    timestamp: '2026-09-13 18:42:12',
    status: 'DISPATCHED'
  },
  {
    id: 'KRS-SIG-1027',
    name: 'Elena Rostova',
    age: '28',
    location: 'District 4 // Industrial Hub',
    email: 'elena.rostova@momentwatch.io',
    grievance: 'Anomalous chronal distortion detected in transport grid. Commuters reporting lost time windows.',
    distressLevel: 'URGENT',
    timestamp: '2026-09-13 15:08:55',
    status: 'DISPATCHED'
  }
];

/**
 * Retrieves all stored signals from localStorage, newest first.
 * Seeds initial demo data if empty.
 */
export function getStoredSignals() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_SIGNALS));
      return INITIAL_DEMO_SIGNALS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse Signal Vault records:', err);
    return [];
  }
}

/**
 * Saves a new signal transmission to localStorage.
 *
 * @param {Object} signal
 * @param {string} signal.name
 * @param {string} signal.age
 * @param {string} signal.location
 * @param {string} signal.email
 * @param {string} signal.grievance
 * @param {string} [signal.distressLevel]
 * @param {string} [signal.timestamp]
 * @param {string} [signal.status]
 * @returns {Object} Saved record
 */
export function saveSignal(signal) {
  if (typeof window === 'undefined') return signal;

  const current = getStoredSignals();
  const idNumber = Math.floor(1000 + Math.random() * 9000);
  const newRecord = {
    id: `KRS-SIG-${idNumber}`,
    name: signal.name || 'Anonymous Citizen',
    age: signal.age || 'Unknown',
    location: signal.location || 'Sector 00 // Unspecified',
    email: signal.email || 'N/A',
    grievance: signal.grievance || 'No details provided.',
    distressLevel: signal.distressLevel || 'URGENT',
    timestamp: signal.timestamp || new Date().toLocaleString(),
    status: signal.status || 'DISPATCHED'
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event so any active on-page components update instantly
    window.dispatchEvent(new CustomEvent('kairos-vault-updated', { detail: newRecord }));
  } catch (err) {
    console.error('Failed to save record to Signal Vault:', err);
  }

  return newRecord;
}

/**
 * Returns total count of archived signals.
 */
export function getSignalCount() {
  return getStoredSignals().length;
}
