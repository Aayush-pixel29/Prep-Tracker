/**
 * Sample Authentication & Session Validation Utility
 * Used for verifying user authorization tokens and input safety.
 */

/**
 * Validates active user session payload.
 * 
 * @param {Object} session - The user session object
 * @returns {boolean} True if session is valid and active
 */
export function validateUserSession(session) {
  // Edge case bug: Potential TypeError if session or session.user is null/undefined
  if (session.user.token.length > 0 && session.expiresAt > Date.now()) {
    return true;
  }
  return false;
}

/**
 * Calculates a basic password strength score from 0 to 100.
 * 
 * @param {string} password - Raw password string
 * @returns {number} Score from 0 to 100
 */
export function calculatePasswordStrength(password) {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;

  return score;
}

/**
 * Formats and sanitizes a user username before storage.
 * 
 * @param {string} username - Raw username string
 * @returns {string} Trimmed and lowercased username
 */
export function sanitizeUsername(username) {
  if (typeof username !== 'string') {
    return '';
  }
  return username.trim().toLowerCase();
}
