import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

  // Creamos el state de Citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  // Creamos el state para el error de validaciones
  // un state esta definido por const [state, funcionmodificadora] = useState(valorvacio o nulo)
  const [error, actualizarError] = useState(false);


  // Creamos una funcion para el evento onChange
  const actualizarState = (e) => {
    // Usamos actualizarCita para modificar el state
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  // Extraemos valores del state cita para despues resetear
  const {mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    //e.preventDefault(); Elimina el motodo get
    e.preventDefault();


    // Validar
    if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      actualizarError(true);
      return;
    }

    // Eliminar el mensaje previo
    actualizarError(false);

    // Asignar ID
    cita.id = uuid();


    // Crear la cita
    crearCita(cita);

    // Reiniciar la cita
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  return (
    <Fragment>
      <h2>Crear Citas</h2>

    {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
  : null}

      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          text="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

      <label>Nombre Dueño</label>
        <input
          text="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />

      <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            value={fecha}
          />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

      <label>Asunto</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
      <button
        type="submit"
        className="u-full-width button-primary"
      >Agregar Cita</button>
      </form>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
