import React from 'react'

const formulario = () => {
  return (
    <>
      <div>
        <form action="/procesar-formulario" method="POST">
        <fieldset>
        <legend>Contacto</legend>
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre" required><br><br>
        <label for="email">Correo electrónico:</label><br>
        <input type="email" id="email" name="email" required><br><br>
        <label for="mensaje">Mensaje:</label><br>
        <textarea id="mensaje" name="mensaje" rows="5" cols="40" required></textarea><br><br>
        <button type="submit">Enviar</button>
        </fieldset>
        </form>
      </div>
    </>
      
  )
}

export default formulario
