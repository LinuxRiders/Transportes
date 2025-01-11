import React, { useState, useRef, useEffect } from "react";
import {
  FaCar,
  FaMapMarkerAlt,
  FaSearch,
  FaExchangeAlt,
  FaUsers,
} from "react-icons/fa";
import { useMediaQuery } from "@mui/material";

const Buscador = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [pasajeros, setPasajeros] = useState({ adultos: 1, ninos: 0 });
  const [mostrarPasajeros, setMostrarPasajeros] = useState(false);
  const [mostrarListaOrigen, setMostrarListaOrigen] = useState(false);
  const [mostrarListaDestino, setMostrarListaDestino] = useState(false);
  const [animando, setAnimando] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const lugaresSugeridos = [
    "Cusco",
    "Calca",
    "Ollantaytambo",
    "Urubamba",
    "Maras Moray",
    "Chinchero",
    "Pisac",
    "Poroy",
  ];

  const origenRef = useRef(null);
  const destinoRef = useRef(null);
  const pasajerosRef = useRef(null);

  const manejarClicFuera = (ref, setter) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setter(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref, setter]);
  };

  manejarClicFuera(origenRef, setMostrarListaOrigen);
  manejarClicFuera(destinoRef, setMostrarListaDestino);
  manejarClicFuera(pasajerosRef, setMostrarPasajeros);

  const manejarIntercambio = () => {
    setAnimando(true);
    setTimeout(() => {
      const temp = origen;
      setOrigen(destino);
      setDestino(temp);
      setAnimando(false);
    }, 300);
  };

  const manejarCambioPasajeros = (tipo, operacion) => {
    setPasajeros((prev) => {
      const nuevoValor =
        operacion === "incrementar" ? prev[tipo] + 1 : prev[tipo] - 1;
      return {
        ...prev,
        [tipo]: Math.max(0, nuevoValor),
      };
    });
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    console.log("Buscando con los datos:", {
      origen,
      destino,
      fecha,
      pasajeros,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        alignItems: "center",
        //backgroundImage:"url('https://illapatransportes.com/wp-content/uploads/2023/03/banner1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={manejarBusqueda}
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          gap: isSmallScreen ? "20px" : "15px",
          backgroundColor: "white", //"rgba(255, 255, 255, 0.43)",
          padding: "25px",
          borderRadius: "30px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          width: "100%",
          maxWidth: "1200px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
        }}
      >
        <div
          ref={origenRef}
          className="desplegable"
          style={{
            position: "relative",
            flex: 1,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: animando ? 0.5 : 1,
            transform: animando ? "translateX(20px)" : "translateX(0)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: isSmallScreen ? "80vw" : "100%",
            }}
          >
            <FaCar style={{ color: "#ff7800", fontSize: "20px" }} />
            <input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              onClick={() => setMostrarListaOrigen(true)}
              placeholder="Desde"
              required
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
              }}
            />
          </div>
          {mostrarListaOrigen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                zIndex: 10,
              }}
            >
              {lugaresSugeridos
                .filter((lugar) => lugar !== destino)
                .map((lugar) => (
                  <div
                    key={lugar}
                    onClick={() => {
                      setOrigen(lugar);
                      setMostrarListaOrigen(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e7e7e7")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    {lugar}
                  </div>
                ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={manejarIntercambio}
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: isSmallScreen ? "40%" : "50%",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            alignSelf: isSmallScreen ? "center" : "flex-start",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#e8e8e8";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
        >
          <FaExchangeAlt style={{ color: "#ff7800", fontSize: "20px" }} />
        </button>

        <div
          ref={destinoRef}
          className="desplegable"
          style={{
            position: "relative",
            flex: 1,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: animando ? 0.5 : 1,
            transform: animando ? "translateX(-20px)" : "translateX(0)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: isSmallScreen ? "80vw" : "100%",
            }}
          >
            <FaMapMarkerAlt style={{ color: "#ff7800", fontSize: "20px" }} />
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              onClick={() => setMostrarListaDestino(true)}
              placeholder="Hasta"
              required
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
              }}
            />
          </div>
          {mostrarListaDestino && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                zIndex: 10,
              }}
            >
              {lugaresSugeridos
                .filter((lugar) => lugar !== origen)
                .map((lugar) => (
                  <div
                    key={lugar}
                    onClick={() => {
                      setDestino(lugar);
                      setMostrarListaDestino(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e7e7e7")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    {lugar}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            alignSelf: isSmallScreen ? "center" : "flex-start",
          }}
        >
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={{
              width: isSmallScreen ? "80vw" : "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
            }}
          />
        </div>
        <div
          ref={pasajerosRef}
          style={{
            position: "relative",
            flex: 1,
            alignSelf: isSmallScreen ? "center" : "flex-start",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMostrarPasajeros(!mostrarPasajeros);
            }}
            style={{
              width: isSmallScreen ? "80vw" : "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
              backgroundColor: "white",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "16px",
              position: "relative",
            }}
          >
            {`${pasajeros.adultos + pasajeros.ninos} pasajeros`}
            <FaUsers
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#ff7800",
                fontSize: "1.5rem",
              }}
            />
          </button>

          {mostrarPasajeros && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>Adultos:</span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      manejarCambioPasajeros("adultos", "decrementar")
                    }
                    style={{ padding: "5px" }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{pasajeros.adultos}</span>
                  <button
                    type="button"
                    onClick={() =>
                      manejarCambioPasajeros("adultos", "incrementar")
                    }
                    style={{ padding: "5px" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Niños:</span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      manejarCambioPasajeros("ninos", "decrementar")
                    }
                    style={{ padding: "5px" }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{pasajeros.ninos}</span>
                  <button
                    type="button"
                    onClick={() =>
                      manejarCambioPasajeros("ninos", "incrementar")
                    }
                    style={{ padding: "5px" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#ff7800",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.71)",
            transition: "transform 0.3s ease",
            alignSelf: isSmallScreen ? "center" : "flex-start",
            width: isSmallScreen ? "100%" : "auto",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaSearch style={{ fontSize: "20px" }} />
        </button>
      </form>
    </div>
  );
};

export default Buscador;
