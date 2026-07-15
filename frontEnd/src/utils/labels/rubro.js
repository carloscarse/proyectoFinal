// frontEnd/src/utils/labels/rubro.js

export function getRubroLabel(rubroObj) {
  if (!rubroObj || typeof rubroObj !== 'object') return '';

  const parts = [safePart(rubroObj.rubro)].filter(Boolean);

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function safePart(value) {
  if (value == null) return '';
  if (typeof value !== 'string') {
    try {
      const s = String(value);
      return s.trim() ? s.trim() : '';
    } catch {
      return '';
    }
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : '';
}