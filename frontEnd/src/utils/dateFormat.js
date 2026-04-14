// frontEnd/src/utils/dateFormat.js

// Muestra la fecha en formato dd/mm/yyyy
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Convierte fecha a formato yyyy-mm-dd para enviar al backend
export function fechaManipular(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // siempre devuelve YYYY-MM-DD
}