// Remark plugin for content markers.
// In local preview (npm run dev) markers are highlighted so they can't be missed.
// In the published build they are removed, along with any paragraph or list
// item left empty, so visitors only ever see confirmed content.
import { MARKER_RE } from './markers.mjs';

function splitText(value, strip) {
  const out = [];
  let last = 0, m, found = false;
  MARKER_RE.lastIndex = 0;
  while ((m = MARKER_RE.exec(value))) {
    found = true;
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    if (!strip) out.push({ type: 'html', value: `<mark class="gap">${m[0]}</mark>` });
    last = m.index + m[0].length;
  }
  if (!found) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

const textOf = (n) => (n.type === 'text' || n.type === 'html' ? n.value : (n.children || []).map(textOf).join(''));

function walk(node, strip) {
  if (!node.children) return;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      const parts = splitText(child.value, strip);
      if (parts) { next.push(...parts); continue; }
    }
    walk(child, strip);
    if (strip && (child.type === 'paragraph' || child.type === 'listItem') && textOf(child).trim() === '') continue;
    next.push(child);
  }
  node.children = next;
}

export default function remarkGaps(options = {}) {
  const strip = options.strip ?? false;
  return (tree) => walk(tree, strip);
}
