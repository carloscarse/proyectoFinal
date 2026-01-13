export function getTelefonoLabel(telefono) {
  if (!telefono) return '';
  const pais = telefono.pais ? String(telefono.pais).trim() : '';
  const cArea = telefono.cArea ? String(telefono.cArea).trim() : '';
  const numero = telefono.numero ? String(telefono.numero).trim() : '';
  return [pais, cArea, numero].filter(Boolean).join(' ');
}