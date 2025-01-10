import React, { useState } from "react";
import "./VehicleCard.css";

const VehicleCard = () => {
  const vehicles = [
    {
      idvehiculo: 1,
      empresa: "Camioneta",
      logo: "https://assets.volkswagen.com/is/image/volkswagenag/nuevo_taos_cutout_864x326?Zml0PWNyb3AsMSZmbXQ9d2VicC1hbHBoYSZxbHQ9Nzkmd2lkPTgwMCZiZmM9b2ZmJjU0MDQ=", // Sustituir por el logo real
      primera_salida: "16:00 PM",
      ultima_salida: "23:00 PM",
      duracion: "07h 55m",
      precios: [25500],
      rating: 4.9,
      horarios: [
        {
          salida: "16:00 PM",
          llegada: "23:55 PM",
          terminal: "Term. Sur (Alameda)",
          precio: 25500,
        },
        {
          salida: "16:45 PM",
          llegada: "00:50 AM",
          terminal: "Term. Sur (Alameda)",
          precio: 35700,
        },
      ],
    },
    {
      idvehiculo: 2,
      empresa: "Camioneta",
      logo: "https://assets.volkswagen.com/is/image/volkswagenag/nuevo_taos_cutout_864x326?Zml0PWNyb3AsMSZmbXQ9d2VicC1hbHBoYSZxbHQ9Nzkmd2lkPTgwMCZiZmM9b2ZmJjU0MDQ=", // Sustituir por el logo real
      primera_salida: "16:00 PM",
      ultima_salida: "23:00 PM",
      duracion: "07h 55m",
      precios: [25500],
      rating: 4.3,
      horarios: [
        {
          salida: "16:00 PM",
          llegada: "23:55 PM",
          terminal: "Term. Sur (Alameda)",
          precio: 25500,
        },
        {
          salida: "16:45 PM",
          llegada: "00:50 AM",
          terminal: "Term. Sur (Alameda)",
          precio: 35700,
        },
        {
          salida: "17:30 PM",
          llegada: "01:26 AM",
          terminal: "Term. Sur (Alameda)",
          precio: 25500,
        },
      ],
    },
    {
      idvehiculo: 3,
      empresa: "Camioneta",
      logo: "https://assets.volkswagen.com/is/image/volkswagenag/nuevo_taos_cutout_864x326?Zml0PWNyb3AsMSZmbXQ9d2VicC1hbHBoYSZxbHQ9Nzkmd2lkPTgwMCZiZmM9b2ZmJjU0MDQ=", // Sustituir por el logo real
      primera_salida: "16:00 PM",
      ultima_salida: "23:00 PM",
      duracion: "07h 55m",
      precios: [25500],
      rating: 3.1,
      horarios: [
        {
          salida: "16:00 PM",
          llegada: "23:55 PM",
          terminal: "Term. Sur (Alameda)",
          precio: 25500,
        },
      ],
    },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="vehicle-card-container">
      {vehicles.map((vehicle) => (
        <div key={vehicle.idvehiculo} className="vehicle-card">
          {/* Tarjeta principal */}
          <div
            className="vehicle-main"
            onClick={() => toggleAccordion(vehicle.idvehiculo)}
          >
            <div className="vehicle-logo-container">
              <img
                src={vehicle.logo}
                alt={vehicle.empresa}
                className="vehicle-logo"
              />
              <div>
                <h3 className="vehicle-name">{vehicle.empresa}</h3>
                <div className="expand-indicator">
                  {vehicle.horarios.length} salidas disponibles{" "}
                  <span className="expand-icon">
                    {expandedCard === vehicle.idvehiculo ? "▲" : "▼"}
                  </span>
                </div>
              </div>
            </div>
            <div className="vehicle-info">
              <p>
                <strong>Primera salida:</strong> {vehicle.primera_salida}
              </p>
              <p>
                <strong>Última salida:</strong> {vehicle.ultima_salida}
              </p>
              <p>
                <strong>Duración:</strong> {vehicle.duracion}
              </p>
            </div>
            <div className="vehicle-actions">
              <p className="price">${vehicle.precios[0]}</p>
              <div className="vehicle-rating">
                <span>{vehicle.rating}</span>
                <span className="stars">⭐</span>
              </div>
              <span className="cart-icon">🛒</span>
            </div>
          </div>

          {/* Acordeón: Detalles adicionales */}
          {expandedCard === vehicle.idvehiculo && (
            <div className="vehicle-details">
              {vehicle.horarios.map((horario, index) => (
                <div key={index} className="vehicle-schedule">
                  <div className="schedule-info">
                    <p>
                      <strong>Salida</strong>
                    </p>
                    <p>{horario.salida}</p>
                  </div>
                  <div className="schedule-info">
                    <p>
                      <strong>Llegada</strong>
                    </p>
                    <p>{horario.llegada}</p>
                  </div>
                  <div className="schedule-info">
                    <p>
                      <strong>Terminal</strong>
                    </p>
                    <p>{horario.terminal}</p>
                  </div>
                  <div className="schedule-info">
                    <p>${horario.precio}</p>
                  </div>
                  <button className="buy-button">Comprar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VehicleCard;
