// proyecto/frontEnd/src/utils/labels/inquilino.js

import { getPersonaLabel } from './persona';

/**
 * Devuelve el label de un inquilino basado en la persona asociada.
 * Si no tiene persona, retorna string vacío.
 */
export function getInquilinoLabel(inquilino) {
  if (!inquilino || typeof inquilino !== 'object') return '';

  // El inquilino trae la persona asociada en la propiedad `persona`
  return getPersonaLabel(inquilino);
}