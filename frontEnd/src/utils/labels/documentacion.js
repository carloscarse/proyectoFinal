// proyecto/frontEnd/src/utils/labels/documentacion.js

export function getDocumentacionLabel(documentacion) {
  if (!documentacion || typeof documentacion !== 'object') return '';

  const parts = [
    safePart(documentacion.documento),
    safePart(documentacion.descripcion)
  ].filter(Boolean);

  return parts.join(' - ').replace(/\s+/g, ' ').trim();
}

/**
 * Devuelve una parte segura para concatenar en el label:
 * - Si no existe, es null, undefined o es string vacío/espacios => retorna ''
 * - Si existe, recorta espacios laterales y valida que no quede vacío
 */
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