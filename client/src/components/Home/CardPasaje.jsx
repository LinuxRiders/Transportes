import React, { useState, useEffect } from "react";
import { FaClock, FaMoneyBillWave } from "react-icons/fa";

const CardPasaje = () => {
  const [tiempoRestante, setTiempoRestante] = useState(13 * 60 + 50); // 13:50 en segundos
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
  const [precioTotal, setPrecioTotal] = useState("S/. 0.00");
  const [imagenModal, setImagenModal] = useState(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempoRestante((tiempoPrevio) =>
        tiempoPrevio > 0 ? tiempoPrevio - 1 : 0
      );
    }, 1000);

    return () => clearInterval(temporizador);
  }, []);

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
  };

  const obtenerEstiloTiempo = () => {
    if (tiempoRestante <= 5 * 60) {
      return {
        color: "#d9534f",
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#fdecea",
        padding: "4px 8px",
        borderRadius: "4px",
        animation: "escaladoTimon 1s infinite",
      };
    } else if (tiempoRestante <= 10 * 60) {
      return {
        color: "#d9534f",
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#fdecea",
        padding: "4px 8px",
        borderRadius: "4px",
      };
    } else {
      return {
        color: "#28a745",
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#eafaf1",
        padding: "4px 8px",
        borderRadius: "4px",
      };
    }
  };

  const opcionesViaje = {
    ruta: "Cusco - Ollantaytambo",
    fecha: "12 Ene 2025",
    hora: "02:00 PM",
  };

  const opcionesAsientos = [
    {
      id: 1,
      precio: "PEN 40",
      reclinacion: "140° reclinable",
      espacioPiernas: "Espacio normal para piernas",
      orientacion: "Orientación 1:2",
      imagen: "https://www.clave7.com/images/portfolio/asientodebuses10.jpg",
      categoria: "Estandar",
    },
    {
      id: 2,
      precio: "PEN 60",
      reclinacion: "160° reclinable",
      espacioPiernas: "Espacio extra para piernas",
      orientacion: "Orientación 2:2",
      imagen:
        "https://incalake.com/galeria/admin/short-slider/BUSES/CRUZ-DEL-SUR/cruz-del-sur-asientos.png",
      categoria: "VIP",
    },
  ];

  const seleccionarAsiento = (asiento) => {
    setAsientoSeleccionado(asiento.id);
    setPrecioTotal(asiento.precio);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "350px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <style>
        {`
          @keyframes escaladoTimon {
            0%, 100% {
              transform: scale(1) rotate(0deg);
            }
            25% {
              transform: scale(1.1) rotate(5deg);
            }
            50% {
              transform: scale(0.9) rotate(-5deg);
            }
            75% {
              transform: scale(1.1) rotate(5deg);
            }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "5%",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaClock /> Completa tu compra en:
        </span>
        <span style={obtenerEstiloTiempo()}>
          {formatearTiempo(tiempoRestante)}
        </span>
      </div>
      <hr
        style={{
          border: "none",
          borderTop: "2px solid black",
          margin: "20px 0",
        }}
      />

      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#333" }}>
          Detalles del pago
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <span>Pago total</span>
          <span>{precioTotal}</span>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#333" }}>
          Detalles del viaje
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <span>{opcionesViaje.ruta}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <span>{opcionesViaje.fecha}</span>
          <span>{opcionesViaje.hora}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => setMostrarDetalles(!mostrarDetalles)}
            style={{
              color: "#d37012",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "bold",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Más
          </button>
        </div>
        {mostrarDetalles && (
          <div
            style={{
              marginTop: "16px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 8px", fontSize: "16px", color: "#333" }}>
              Información del viaje
            </h4>
            <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
              Disfruta de un cómodo viaje de {opcionesViaje.ruta} donde
              pasaremos por distintos atractivos turísticos, para finalmente
              llegar al valle sagrado de los Incas.
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        {opcionesAsientos.map((asiento) => (
          <div
            key={asiento.id}
            style={{
              border:
                asientoSeleccionado === asiento.id
                  ? "2px solid #007bff"
                  : "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              backgroundColor: "#f9f9f9",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onClick={() => seleccionarAsiento(asiento)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setImagenModal(asiento.imagen);
              }}
            >
              <img
                src={asiento.imagen}
                alt="Asiento"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <h4 style={{ margin: "0", fontSize: "16px", color: "#333" }}>
                {asiento.precio}
              </h4>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                {asiento.reclinacion}
              </p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                {asiento.espacioPiernas}
              </p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                {asiento.orientacion}
              </p>
              <p
                style={{
                  margin: "4px 0",
                  fontSize: "14px",
                  color: "darkblue",
                  fontWeight: "bold",
                }}
              >
                {asiento.categoria}
              </p>
            </div>
          </div>
        ))}
      </div>

      {imagenModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setImagenModal(null)}
        >
          <img
            src={imagenModal}
            alt="Asiento ampliado"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 20px",
            backgroundColor: "#d37012",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
            const icon = e.currentTarget.querySelector(".icon");
            if (icon) icon.style.animation = "barrido 0.5s ease";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            const icon = e.currentTarget.querySelector(".icon");
            if (icon) icon.style.animation = "none";
          }}
        >
          <FaMoneyBillWave
            className="icon"
            style={{ fontSize: "20px", transition: "all 0.2s" }}
          />
          Pagar
        </button>
        <style>
          {`
    @keyframes barrido {
      0% { transform: rotate(0) translateY(0); }
      25% { transform: rotate(10deg) translateY(-3px); }
      50% { transform: rotate(-10deg) translateY(3px); }
      75% { transform: rotate(10deg) translateY(-3px); }
      100% { transform: rotate(0) translateY(0); }
    }
  `}
        </style>
      </div>
    </div>
  );
};

export default CardPasaje;
