import React, { useState } from "react";
import "./VehicleCard.css";

const VehicleCard = () => {
  const vehicles = [
    {
      idvehiculo: 1,
      empresa: "Wari Palomino",
      logo: "https://www.grupopalomino.com.pe/assets/img/palomino.png",
      clase: "CHASQUI CLASS",
      primera_salida: "08:00 AM",
      ultima_llegada: "07:00 AM",
      duracion: "23h 00m",
      precio: 140,
      asientos_disponibles: 50,
      servicios: [
        { icon: "🛋️", nombre: "Asiento reclinable 160°" },
        { icon: "🛋️", nombre: "Asiento reclinable 140°" },
        { icon: "❄️", nombre: "Aire acondicionado" },
        { icon: "📺", nombre: "TV" },
        { icon: "🎵", nombre: "Música" },
        { icon: "🛁", nombre: "Baños" },
        { icon: "📱", nombre: "eTicket (boleto electrónico)" },
        { icon: "🔌", nombre: "Toma corriente" },
        { icon: "🚿", nombre: "Cuarto de baño" },
        { icon: "🔋", nombre: "Puerto USB para el cargador" },
        { icon: "🚻", nombre: "Servicios higiénicos" },
      ],
      horarios: [
        {
          salida: "08:00 AM",
          llegada: "07:00 AM",
          terminal_origen: "Terminal Terrestre Cusco",
          terminal_destino: "La Victoria",
          precio: 140,
        },
        {
          salida: "09:00 AM",
          llegada: "08:00 AM",
          terminal_origen: "La Victoria",
          terminal_destino: "Terminal Terrestre Cusco",
          precio: 150,
        },
      ],
    },
    {
      idvehiculo: 2,
      empresa: "Andes Express",
      logo: "https://www.grupopalomino.com.pe/assets/img/palomino.png",
      clase: "LUXURY CLASS",
      primera_salida: "10:00 AM",
      ultima_llegada: "09:00 PM",
      duracion: "11h 00m",
      precio: 180,
      asientos_disponibles: 40,
      servicios: [
        { icon: "🛋️", nombre: "Asiento reclinable 180°" },
        { icon: "❄️", nombre: "Aire acondicionado premium" },
        { icon: "📺", nombre: "TV personal" },
        { icon: "🎵", nombre: "Auriculares incluidos" },
        { icon: "🛁", nombre: "Baños" },
      ],
      horarios: [
        {
          salida: "10:00 AM",
          llegada: "09:00 PM",
          terminal_origen: "Terminal Terrestre Lima",
          terminal_destino: "Terminal Terrestre Arequipa",
          precio: 180,
        },
      ],
    },
  ];

  const [expandedTabs, setExpandedTabs] = useState({});

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
                src={vehicle.logo}
                alt={vehicle.empresa}
                className="unique-vehicle-logo"
              />
            </div>
            <div className="unique-vehicle-info">
              <h3 className="unique-vehicle-name">{vehicle.empresa}</h3>
              <p className="unique-vehicle-class">{vehicle.clase}</p>
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
              <p>👥 {vehicle.asientos_disponibles}</p>
              <p>
                Desde <strong>s/ {vehicle.precio}</strong>
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
              {vehicle.servicios.map((servicio, index) => (
                <div key={index} className="unique-service-item">
                  <span className="unique-service-icon">{servicio.icon}</span>
                  <p>{servicio.nombre}</p>
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
