import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';

const FormularioFactura = ({ onFacturaSeleccionada }) => {
  const [fecha, setFecha] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('emitida');
  const [inquilino, setInquilino] = useState('');
  const [nota, setNota] = useState('');
  const [inquilinos, setInquilinos] = useState([]);
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/inquilino/inquilinos')
      .then(res => res.json())
      .then(async data => {
        const lista = Array.isArray(data) ? data : [];
        const inquilinosConLabel = await Promise.all(
          lista.map(async (i) => {
            let label = `Inquilino #${i.id}`;
            try {
              if (i.persona) {
                const resPersona = await fetch(`http://localhost:8000/persona/${i.persona}`);
                const p = await resPersona.json();
                const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
                label = partes.filter(v => v && v !== 'null').join(' ').trim() || label;
              }
            } catch (err) {
              console.error(`❌ Error al obtener persona ${i.persona}:`, err);
            }
            return { id: String(i.id), label };
          })
        );
        setInquilinos(inquilinosConLabel);
      })
      .catch(err => console.error('❌ Error al cargar inquilinos:', err));
  }, []);

  const handleInquilinoChange = (e) => {
    const value = e.target.value;
    if (value === 'nuevo') {
      setShowNuevoInquilino(true);
    } else {
      setInquilino(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaFactura = {
      fecha,
      numero: Number(numero),
      estado,
      inquilino: Number(inquilino),
      nota
    };

    try {
      const res = await fetch('http://localhost:8000/factura/factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaFactura)
      });

      const data = await res.json();

      if (res.ok) {
        onFacturaSeleccionada && onFacturaSeleccionada(data.id);
      } else {
        alert('❌ Error al crear factura: ' + data.error);
      }
    } catch (err) {
      console.error('❌ Error en el registro de factura:', err);
    }
  };

  return (
    <>
      <h5>Nueva Factura</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="emitida">Emitida</option>
            <option value="pagada">Pagada</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Inquilino</Form.Label>
          <Form.Select value={inquilino} onChange={handleInquilinoChange} required>
            <option value="">-- Seleccione --</option>
            <option value="nuevo">➕ Nuevo</option>
            {inquilinos.map(i => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nota</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>

      {showNuevoInquilino && (
        <Modal show onHide={() => setShowNuevoInquilino(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Inquilino</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormularioInquilino
              onClose={async (nuevoId) => {
                setShowNuevoInquilino(false);
                if (nuevoId) {
                  // Refrescar lista y seleccionar el nuevo
                  const res = await fetch('http://localhost:8000/inquilino/inquilinos');
                  const lista = await res.json();
                  const inquilinosConLabel = await Promise.all(
                    lista.map(async (i) => {
                      let label = `Inquilino #${i.id}`;
                      try {
                        if (i.persona) {
                          const resPersona = await fetch(`http://localhost:8000/persona/${i.persona}`);
                          const p = await resPersona.json();
                          const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
                          label = partes.filter(v => v && v !== 'null').join(' ').trim() || label;
                        }
                      } catch (err) {
                        console.error(`❌ Error al obtener persona ${i.persona}:`, err);
                      }
                      return { id: String(i.id), label };
                    })
                  );
                  setInquilinos(inquilinosConLabel);
                  setInquilino(String(nuevoId));
                }
              }}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default FormularioFactura;