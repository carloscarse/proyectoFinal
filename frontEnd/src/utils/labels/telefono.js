// frontEnd/src/utils/labels/telefono.js

export function getTelefonoLabel(telefono) {
  if (!telefono) return '';
  const pais = telefono.pais ? String(telefono.pais).trim() : '';
  const cArea = telefono.cArea ? String(telefono.cArea).trim() : '';
  const numero = telefono.numero ? String(telefono.numero).trim() : '';
  return ["+", pais, 9," ", cArea," ", numero].filter(Boolean).join(' ');
}