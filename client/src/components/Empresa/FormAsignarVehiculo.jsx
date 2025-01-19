import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./FormAsignarVehiculo.css";

const FormAsignarVehiculo = () => {
  const [terminales, setTerminales] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [idTerminal, setIdTerminal] = useState("");
  const [idVehiculo, setIdVehiculo] = useState("");
  const [horaLlegada, setHoraLlegada] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [terminalRes, vehiculoRes, asignacionRes] = await Promise.all([
          api.get("/terminales"),
          api.get("/vehiculos"),
          api.get("/colas-terminal"),
        ]);
        setTerminales(terminalRes.data.data || []);
        setVehiculos(vehiculoRes.data.data || []);
        setAsignaciones(asignacionRes.data.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setErrorMessage("Error al cargar datos.");
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setIdTerminal("");
    setIdVehiculo("");
    setHoraLlegada("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (editingId) {
        await api.put(`/colas-terminal/${editingId}`, {
          id_terminal: Number(idTerminal),
          idvehiculo: Number(idVehiculo),
          hora_llegada: horaLlegada.replace("T", " ") + ":00", // Convierte el formato
          estado: "en_cola", // Valor predeterminado
        });
        setSuccessMessage("Asignación actualizada exitosamente.");
      } else {
        await api.post("/colas-terminal", {
          id_terminal: Number(idTerminal),
          id_vehiculo: Number(idVehiculo), // CORRECTO
          hora_llegada: horaLlegada.replace("T", " ") + ":00",
          estado: "en_cola",
        });

        setSuccessMessage("Vehículo asignado exitosamente.");
      }
      resetForm();
      const asignacionRes = await api.get("/colas-terminal");
      setAsignaciones(asignacionRes.data.data || []);
    } catch (error) {
      console.error("Error al guardar la asignación:", error);
      setErrorMessage("Error al guardar la asignación.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (asignacion) => {
    setIdTerminal(asignacion.id_terminal);
    setIdVehiculo(asignacion.idvehiculo);
    setHoraLlegada(asignacion.hora_llegada);
    setEditingId(asignacion.id_cola);
  };

  return (
    <div className="form-asignar-vehiculo-container">
      <h2>{editingId ? "Editar Asignación" : "Asignar Vehículo a Terminal"}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form-asignar-vehiculo">
        <label>Terminal:</label>
        <select
          value={idTerminal}
          onChange={(e) => setIdTerminal(e.target.value)}
          required
        >
          <option value="">Seleccione un terminal</option>
          {terminales.map((terminal) => (
            <option key={terminal.id_terminal} value={terminal.id_terminal}>
              {terminal.nombre}
            </option>
          ))}
        </select>
        <label>Vehículo:</label>
        <select
          value={idVehiculo}
          onChange={(e) => setIdVehiculo(e.target.value)}
          required
        >
          <option value="">Seleccione un vehículo</option>
          {vehiculos.map((vehiculo) => (
            <option key={vehiculo.idvehiculo} value={vehiculo.idvehiculo}>
              {vehiculo.marca} - {vehiculo.modelo}
            </option>
          ))}
        </select>
        <label>Hora de llegada:</label>
        <input
          type="datetime-local"
          value={horaLlegada}
          onChange={(e) => setHoraLlegada(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading
            ? "Guardando..."
            : editingId
            ? "Actualizar Asignación"
            : "Asignar Vehículo"}
        </button>
      </form>
    </div>
  );
};

export default FormAsignarVehiculo;
