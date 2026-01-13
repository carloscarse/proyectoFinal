export function getDireccionLabel(direccion) {
  if (!direccion) return '';
  const calle = direccion.calle?.trim() || '';
  const numero = direccion.numero ? String(direccion.numero).trim() : '';
  return [calle, numero].filter(Boolean).join(' ');
}