import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./FormGestionarColas.css";

const formatDate = (datetime) => {
  if (!datetime) return "N/A";
  const dateObj = new Date(datetime);
  return {
    date: dateObj.toLocaleDateString("es-ES"),
    time: dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const FormGestionarColas = () => {
  const [terminales, setTerminales] = useState([]);
  const [colas, setColas] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerminales = async () => {
      try {
        const response = await api.get("/terminales");
        setTerminales(response.data.data || []);
      } catch (err) {
        console.error("Error al cargar terminales:", err);
        setError("No se pudieron cargar las terminales.");
      }
    };

    fetchTerminales();
  }, []);

  const handleTerminalChange = async (e) => {
    const terminalId = e.target.value;
    setSelectedTerminal(terminalId);
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(
        `/colas-terminal?terminal_id=${terminalId}`
      );
      const colasData = response.data.data || [];
      const detailedColas = await Promise.all(
        colasData.map(async (cola) => {
          const vehiculo = await fetchVehiculo(cola.id_vehiculo);
          return { ...cola, vehiculo };
        })
      );
      setColas(detailedColas);
    } catch (err) {
      console.error("Error al cargar colas:", err);
      setError("No se pudieron cargar las colas.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVehiculo = async (id) => {
    try {
      const response = await api.get(`/vehiculos/${id}`);
      const vehiculo = response.data.data || {};
      if (vehiculo.id_marca) {
        const marca = await fetchMarca(vehiculo.id_marca);
        return { ...vehiculo, marca };
      }
      return vehiculo;
    } catch (err) {
      console.error(`Error al obtener el vehículo ${id}:`, err);
      return {};
    }
  };

  const fetchMarca = async (id) => {
    try {
      const response = await api.get(`/marcas/${id}`);
      return response.data.data?.marca || "N/A";
    } catch (err) {
      console.error(`Error al obtener la marca ${id}:`, err);
      return "N/A";
    }
  };

  const handleRemoveFromQueue = async (colaId) => {
    try {
      await api.delete(`/colas-terminal/${colaId}`);
      setColas((prev) => prev.filter((cola) => cola.id_cola !== colaId));
      alert("Vehículo removido de la cola.");
    } catch (err) {
      console.error("Error al remover vehículo de la cola:", err);
      alert("Error al intentar remover el vehículo.");
    }
  };

  return (
    <div className="form-gestionar-colas-container">
      <h2>Gestionar Colas de Vehículos</h2>
      <label htmlFor="terminal-select">Seleccionar Terminal:</label>
      <select
        id="terminal-select"
        onChange={handleTerminalChange}
        value={selectedTerminal}
        className="terminal-select"
      >
        <option value="">Seleccione un terminal</option>
        {terminales.map((terminal) => (
          <option key={terminal.id_terminal} value={terminal.id_terminal}>
            {terminal.nombre}
          </option>
        ))}
      </select>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Cargando colas...</p>}

      {!loading && colas.length > 0 && (
        <table className="colas-table">
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Hora de Llegada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colas.map((cola) => {
              const llegada = formatDate(cola.hora_llegada);
              return (
                <tr key={cola.id_cola}>
                  <td>
                    {cola.vehiculo?.marca || "N/A"} -{" "}
                    {cola.vehiculo?.modelo || "N/A"} (
                    {cola.vehiculo?.placa || "N/A"})
                  </td>
                  <td>
                    {llegada.date} a las {llegada.time}
                  </td>
                  <td>{cola.estado || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveFromQueue(cola.id_cola)}
                      className="remove-button"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {!loading && !colas.length && selectedTerminal && (
        <p>No hay vehículos en cola para este terminal.</p>
      )}
    </div>
  );
};

export default FormGestionarColas;
