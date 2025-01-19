import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./VehicleCard.css";

const formatDate = (datetime) => {
  if (!datetime) return "N/A";
  const dateObj = new Date(datetime);
  const date = dateObj.toLocaleDateString("es-ES"); // Fecha en formato DD/MM/YYYY
  const time = dateObj.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }); // Hora en formato HH:MM
  return { date, time };
};

const VehicleCard = () => {
  const [trip, setTrip] = useState(null); // Solo un viaje principal
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get("/viajes");
        const data = response.data.data || [];
        if (data.length > 0) {
          const tripData = data[0];
          const terminal_origen = await fetchTerminal(
            tripData.id_terminal_origen
          );
          const terminal_destino = await fetchTerminal(
            tripData.id_terminal_destino
          );
          const colas = await fetchColas(tripData.id_terminal_origen);
          setTrip({ ...tripData, terminal_origen, terminal_destino, colas });
        } else {
          console.warn("No se encontraron viajes.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos del viaje:", err);
        setError("No se pudo cargar la información del viaje.");
        setLoading(false);
      }
    };

    const fetchTerminal = async (id) => {
      try {
        const response = await api.get(`/terminales/${id}`);
        const terminal = response.data.data || {};
        if (terminal.id_ciudad) {
          const ciudad = await fetchCiudad(terminal.id_ciudad);
          return { ...terminal, ciudad };
        }
        return terminal;
      } catch (err) {
        console.error(`Error al obtener el terminal ${id}:`, err);
        return {};
      }
    };

    const fetchCiudad = async (id) => {
      try {
        const response = await api.get(`/ciudades/${id}`);
        return response.data.data?.nombre || "N/A";
      } catch (err) {
        console.error(`Error al obtener la ciudad ${id}:`, err);
        return "N/A";
      }
    };

    const fetchColas = async (idTerminal) => {
      try {
        const response = await api.get(
          `/colas-terminal?terminal_id=${idTerminal}`
        );
        const colas = response.data.data || [];
        return Promise.all(
          colas.map(async (cola) => {
            const vehiculo = await fetchVehiculo(cola.id_vehiculo);
            return { ...cola, vehiculo };
          })
        );
      } catch (err) {
        console.error(
          `Error al obtener las colas del terminal ${idTerminal}:`,
          err
        );
        return [];
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

    fetchTrip();
  }, []);

  if (loading) {
    return <div>Cargando información del viaje...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!trip) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  const { terminal_origen, terminal_destino, colas } = trip;
  const salida = formatDate(trip.fecha_hora_salida);
  const llegada = formatDate(trip.fecha_hora_llegada);

  return (
    <div className="unique-vehicle-card-container">
      {/* Card Principal */}
      <div className="unique-vehicle-card">
        <div className="unique-vehicle-main">
          <div className="unique-vehicle-info">
            <h3 className="unique-vehicle-name">Viaje de Terminal</h3>
            <p>
              <strong>Origen:</strong> {terminal_origen?.nombre || "N/A"} (
              {terminal_origen?.ciudad || "N/A"})
            </p>
            <p>
              <strong>Destino:</strong> {terminal_destino?.nombre || "N/A"} (
              {terminal_destino?.ciudad || "N/A"})
            </p>
            <p>
              <strong>Primera salida:</strong> {salida.date} a las {salida.time}
            </p>
            <p>
              <strong>Última llegada:</strong> {llegada.date} a las{" "}
              {llegada.time}
            </p>
          </div>
        </div>

        {/* Botón para mostrar salidas */}
        <div className="unique-tabs-container">
          <div
            className={`unique-tab ${expanded ? "active" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            Salidas
          </div>
        </div>

        {/* Detalles desplegables de vehículos */}
        {expanded && (
          <div className="unique-vehicle-details">
            {colas.map((cola) => {
              const vehiculo = cola.vehiculo || {};
              const llegadaCola = formatDate(cola.hora_llegada);
              return (
                <div key={cola.id_cola} className="unique-vehicle-schedule">
                  <div className="unique-schedule-info">
                    <img
                      src={
                        vehiculo.fotos_vehiculo?.[0] || "/default-vehicle.png"
                      }
                      alt={`Vehículo ${vehiculo.modelo || "N/A"}`}
                      className="unique-vehicle-image"
                    />
                    <p>
                      <strong>
                        {vehiculo.marca || "N/A"} - {vehiculo.modelo || "N/A"}
                      </strong>
                    </p>
                    <p>Placa: {vehiculo.placa || "N/A"}</p>
                    <p>Asientos: {vehiculo.capacidad_asientos || "N/A"}</p>
                    <p>Maletas: {vehiculo.capacidad_maletas || "N/A"}</p>
                  </div>
                  <div className="unique-schedule-info">
                    <p>
                      <strong>Estado:</strong> {cola.estado || "N/A"}
                    </p>
                    <p>
                      <strong>Hora llegada:</strong> {llegadaCola.date} a las{" "}
                      {llegadaCola.time}
                    </p>
                    <button className="unique-buy-button">Comprar</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
