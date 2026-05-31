// proyecto/frontEnd/src/utils/labels/direccion.js

export function getDireccionLabel(direccion) {
  if (!direccion) return '';

  const calle = direccion.calle?.trim() || '';
  const numero = direccion.numero ? String(direccion.numero).trim() : '';
  const barrio = direccion.barrio?.trim() || '';
  const localidad = direccion.localidad?.trim() || '';
  const ciudad = direccion.ciudad?.trim() || '';
  const provincia = direccion.provincia?.trim() || '';

  // Concatenar los campos que existan, separados por coma
  return [calle && numero ? `${calle} ${numero}` : calle || numero, barrio, localidad, ciudad, provincia]
    .filter(Boolean)
    .join(', ');
}