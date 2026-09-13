import emailjs from '@emailjs/browser';

/**
 * KAIROS EmailJS Client Configuration
 * Client-safe configuration values (public key, service ID, template ID).
 * These can be configured via environment variables or updated here.
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kairos',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kairos_signal',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'kairos_public_key'
};

/**
 * Mock Email Mode Flag
 * When true, simulates transmission without contacting EmailJS servers.
 * Defaults to true for local testing and development.
 */
export const ENABLE_MOCK_EMAIL = import.meta.env.VITE_ENABLE_MOCK_EMAIL !== 'false';

/**
 * Dispatches the collected priority signal payload to the KAIROS Guardian Network.
 *
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.age
 * @param {string} payload.location
 * @param {string} payload.email
 * @param {string} payload.grievance
 * @param {string} [payload.distressLevel]
 * @param {string} payload.timestamp
 * @returns {Promise<{ success: boolean, mock?: boolean, result?: any, error?: any }>}
 */
export async function sendPrioritySignal(payload) {
  if (ENABLE_MOCK_EMAIL) {
    console.group('%c[KAIROS PRIORITY DISPATCH] Mock Mode Active', 'color: #00F0FF; font-weight: bold;');
    console.log('%cKAIROS MOCK DISPATCH — email not actually sent.', 'color: #00FF88; font-weight: bold;');
    console.log('Payload:', payload);
    console.groupEnd();

    // Simulate realistic encryption and transmission latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      mock: true
    };
  }

  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      payload,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return {
      success: true,
      result
    };
  } catch (error) {
    console.error('[KAIROS DISPATCH FAILED]:', error);
    return {
      success: false,
      error
    };
  }
}
