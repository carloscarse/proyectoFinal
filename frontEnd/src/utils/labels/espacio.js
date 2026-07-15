// proyecto/frontEnd/src/utils/labels/espacio.js
export function getEspacioLabel(espacioObj) {
  if (!espacioObj || typeof espacioObj !== 'object') return '';

  const parts = [
    safePart(espacioObj.nombre),
    safePart(espacioObj.tipo),
    safePart(espacioObj.estado)
  ].filter(Boolean);

  return parts.join(' - ').replace(/\s+/g, ' ').trim();
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