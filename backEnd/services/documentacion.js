// proyecto/backEnd/services/documentacion.js

const DocumentacionRepositorio = require('../repositories/documentacion');
const fs = require('fs');
const path = require('path');

const DocumentacionServicio = {
  async obtenerDocumentacion(user) {
    return await DocumentacionRepositorio.obtenerDocumentacion();
  },

  async obtenerDocumentacionPorId(user, id) {
    if (!id) throw new Error('ID requerido');
    const documentacion = await DocumentacionRepositorio.obtenerDocumentacionPorId(id);
    if (!documentacion) throw new Error('Documentación no encontrada o eliminada');
    return documentacion;
  },

  async agregarDocumentacion(user, data, ip) {
    const nuevaDocumentacion = await DocumentacionRepositorio.agregarDocumentacion(data);
    return nuevaDocumentacion;
  },

  async actualizarDocumentacion(user, id, data, ip) {
    if (!id) throw new Error('ID requerido');
    const documentacionPrev = await DocumentacionRepositorio.obtenerDocumentacionPorId(id);
    if (!documentacionPrev) throw new Error(`Documentación con id ${id} no encontrada o eliminada`);

    if (data.documento && documentacionPrev.documento && data.documento!== documentacionPrev.documento) {
      const oldPath = path.join(__dirname, '../uploads', documentacionPrev.documento);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log('🗑️ Archivo anterior eliminado:', documentacionPrev.documento);
      }
    }

    const dataParaActualizar = {
     ...data,
      documento: data.documento || documentacionPrev.documento
    };

    await DocumentacionRepositorio.actualizarDocumentacion(id, dataParaActualizar);
    return { id,...dataParaActualizar };
  },

  async eliminarDocumentacion(user, id, ip) {
    if (!id) throw new Error('ID requerido');
    const documentacionPrev = await DocumentacionRepositorio.obtenerDocumentacionPorId(id);
    if (!documentacionPrev) throw new Error(`Documentación con id ${id} no encontrada o eliminada`);
    await DocumentacionRepositorio.eliminarDocumentacion(id);
    return { message: `Documentación con id ${id} marcada como borrada (borrado lógico)` };
  },

  async eliminarDocumentacionFisico(user, id, ip) {
    if (user?.rol!== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const documentacionPrev = await DocumentacionRepositorio.obtenerDocumentacionPorId(id);
    
    if (documentacionPrev?.documento) {
      const filePath = path.join(__dirname, '../uploads', documentacionPrev.documento);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('🗑️ Archivo físico eliminado:', documentacionPrev.documento);
      }
    }
    
    await DocumentacionRepositorio.eliminarDocumentacionFisico(id);
    return { message: `Documentación con id ${id} eliminada físicamente (borrado definitivo)` };
  },

  async obtenerDocumentacionesEliminadas(user) {
    return await DocumentacionRepositorio.obtenerDocumentacionesEliminadas();
  },

  async obtenerDocumentacionEliminadaPorId(user, id) {
    if (!id) throw new Error('ID requerido');
    const documentacion = await DocumentacionRepositorio.obtenerDocumentacionEliminadaPorId(id);
    if (!documentacion) throw new Error('Documentación eliminada no encontrada');
    return documentacion;
  }
};

module.exports = DocumentacionServicio;