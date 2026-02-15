/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string | null} - Video ID or null if not a valid YouTube URL
 */
export function extractYouTubeId(url) {
  if (!url) return null;

  // Handle different YouTube URL formats:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  // https://www.youtube.com/watch?v=VIDEO_ID&list=...

  let videoId = null;

  // Check for youtu.be format
  const youtuMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (youtuMatch) {
    videoId = youtuMatch[1];
  }

  // Check for youtube.com/watch?v= format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Check for youtube.com/embed/ format
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  return videoId;
}

/**
 * Get YouTube embed URL from video URL
 * @param {string} url - YouTube URL
 * @returns {string | null} - Embed URL or null if not a valid YouTube URL
 */
export function getYouTubeEmbedUrl(url) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Check if URL is a YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if it's a YouTube URL
 */
export function isYouTubeUrl(url) {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
}
