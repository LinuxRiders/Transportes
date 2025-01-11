import React, { useEffect, useState } from "react";
import api from "../../api/api"; // Asegúrate de importar correctamente tu configuración de axios
import "./VehicleCard.css";

const serviceIcons = {
  placa: "🪪",
  carroceria: "🚗",
  transmision: "⚙️",
  combustible: "⛽",
  asientos: "👥",
  maletas: "🧳",
  anio: "📅",
};

const VehicleCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [expandedTabs, setExpandedTabs] = useState({});

  // Llama a la API para obtener los vehículos
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehiculos");
        const { data } = response.data; // Ajusta si tu API tiene otra estructura de respuesta
        setVehicles(data);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
      }
    };

    fetchVehicles();
  }, []);

  const toggleTab = (idvehiculo, tab) => {
    setExpandedTabs((prevState) => ({
      ...prevState,
      [idvehiculo]: prevState[idvehiculo] === tab ? null : tab,
    }));
  };

  const handleCardClick = (idvehiculo) => {
    setExpandedTabs((prevState) => ({
      ...prevState,
      [idvehiculo]: prevState[idvehiculo] === "salidas" ? null : "salidas",
    }));
  };

  return (
    <div className="unique-vehicle-card-container">
      {vehicles.map((vehicle) => (
        <div key={vehicle.idvehiculo} className="unique-vehicle-card">
          {/* Tarjeta principal */}
          <div
            className="unique-vehicle-main"
            onClick={() => handleCardClick(vehicle.idvehiculo)}
          >
            <div className="unique-vehicle-logo-container">
              <img
                src={vehicle.logo || "/default-logo.png"} // Logo por defecto si no existe
                alt={vehicle.marca || "Vehículo"}
                className="unique-vehicle-logo"
              />
            </div>
            <div className="unique-vehicle-info">
              <h3 className="unique-vehicle-name">{vehicle.marca}</h3>
              <p className="unique-vehicle-class">{vehicle.modelo}</p>
            </div>
            <div className="unique-vehicle-timing">
              <div className="timing-item">
                <p className="timing-label">Primera salida</p>
                <span className="unique-vehicle-time">
                  {vehicle.primera_salida}
                </span>
              </div>
              <div className="timing-item">
                <p className="timing-label">Duración</p>
                <span className="unique-vehicle-duration">
                  {vehicle.duracion}
                </span>
              </div>
              <div className="timing-item">
                <p className="timing-label">Última llegada</p>
                <span className="unique-vehicle-time">
                  {vehicle.ultima_llegada}
                </span>
              </div>
            </div>
            <div className="unique-vehicle-asientos-precio">
              <p>👥 {vehicle.capacidad_asientos}</p>
              <p>
                Desde <strong>s/ {vehicle.precio || "N/A"}</strong>
              </p>
            </div>
          </div>

          {/* Desplegable Salidas */}
          {expandedTabs[vehicle.idvehiculo] === "salidas" && (
            <div className="unique-vehicle-details">
              {vehicle.horarios.map((horario, index) => (
                <div key={index} className="unique-vehicle-schedule">
                  <div className="unique-schedule-info">
                    <p>
                      <strong>Salida</strong>
                    </p>
                    <p>{horario.salida}</p>
                  </div>
                  <div className="unique-schedule-info">
                    <p>
                      <strong>Llegada</strong>
                    </p>
                    <p>{horario.llegada}</p>
                  </div>
                  <div className="unique-schedule-info">
                    <p>
                      <strong>Terminal origen</strong>
                    </p>
                    <p>{horario.terminal_origen}</p>
                  </div>
                  <div className="unique-schedule-info">
                    <p>
                      <strong>Terminal destino</strong>
                    </p>
                    <p>{horario.terminal_destino}</p>
                  </div>
                  <div className="unique-schedule-info">
                    <p>s/ {horario.precio}</p>
                  </div>
                  <button className="unique-buy-button">Comprar</button>
                </div>
              ))}
            </div>
          )}

          {/* Desplegable Servicios */}
          {expandedTabs[vehicle.idvehiculo] === "servicios" && (
            <div className="unique-services-container">
              {[
                { key: "placa", value: vehicle.placa },
                { key: "carroceria", value: vehicle.tipo_carroceria },
                { key: "transmision", value: vehicle.tipo_transmision },
                { key: "combustible", value: vehicle.tipo_combustible },
                {
                  key: "asientos",
                  value: `${vehicle.capacidad_asientos} asientos`,
                },
                {
                  key: "maletas",
                  value: `${vehicle.capacidad_maletas} maletas`,
                },
                { key: "anio", value: vehicle.anio_fabricacion },
              ].map((service) => (
                <div key={service.key} className="unique-service-item">
                  <span className="unique-service-icon">
                    {serviceIcons[service.key]}
                  </span>
                  <p>{service.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="unique-tabs-container">
            <div
              className={`unique-tab ${
                expandedTabs[vehicle.idvehiculo] === "salidas" ? "active" : ""
              }`}
              onClick={() => toggleTab(vehicle.idvehiculo, "salidas")}
            >
              Salidas
            </div>
            <div
              className={`unique-tab ${
                expandedTabs[vehicle.idvehiculo] === "servicios" ? "active" : ""
              }`}
              onClick={() => toggleTab(vehicle.idvehiculo, "servicios")}
            >
              Servicios
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleCard;
