/**
 * Simple notification utility for displaying alerts to users
 * @param {string} message - The message to display
 * @param {string} type - The type of notification: 'success', 'error', 'info', 'warning'
 */
export function notify(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  window.alert(`${type.toUpperCase()}: ${message}`);
}
