/**
 * Format a date into relative time format (e.g., "1 jam yang lalu")
 * Supports detik, menit, jam, hari, bulan, tahun
 * @param {string | Date} date - ISO date string or Date object
 * @returns {string} - Formatted relative time in Indonesian
 */
export function formatRelativeTime(date) {
  if (!date) return "";

  const getDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(getDate.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - getDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  // Less than a minute
  if (diffSeconds < 60) {
    return diffSeconds <= 0 ? "sekarang" : `${diffSeconds} detik yang lalu`;
  }

  // Less than an hour
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  }

  // Less than a day
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }

  // Less than a month (30 days)
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} hari yang lalu`;
  }

  // Less than a year (365 days)
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} bulan yang lalu`;
  }

  // Years
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} tahun yang lalu`;
}

/**
 * Format a date into full date format
 * @param {string | Date} date - ISO date string or Date object
 * @returns {string} - Formatted date (DD/MM/YYYY HH:mm)
 */
export function formatFullDate(date) {
  if (!date) return "";

  const getDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(getDate.getTime())) return "";

  const day = String(getDate.getDate()).padStart(2, "0");
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const year = getDate.getFullYear();
  const hours = String(getDate.getHours()).padStart(2, "0");
  const minutes = String(getDate.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
