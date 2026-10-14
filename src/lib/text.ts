import { MARKER_RE } from './markers.mjs';

// Markers are shown in local preview and removed from the published site.
export const SHOW_GAPS = import.meta.env.DEV;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Remove markers and tidy the spacing they leave behind. */
export function plain(s: string): string {
  return s.replace(MARKER_RE, '').replace(/\s{2,}/g, ' ').replace(/\s+([.,;:])/g, '$1').trim();
}

/** Escape a string for set:html; highlight markers in preview, drop them in production. */
export function inline(s: string): string {
  if (!SHOW_GAPS) return escapeHtml(plain(s));
  return escapeHtml(s).replace(MARKER_RE, (m) => `<mark class="gap">${m}</mark>`);
}

/** Prefix an internal path with the configured base path. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
