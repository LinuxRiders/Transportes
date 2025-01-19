import React, { useState, useEffect } from "react";
import api from "../api/api";

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/me");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        setError("No se pudo cargar el perfil del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>No se encontró información del usuario.</p>;

  // Destructuración con valores predeterminados
  const {
    perfil = {},
    email,
    username,
    roles = [],
    conductor = null,
    guia = null,
  } = userData;

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "20px 0",
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Perfil de Usuario</h1>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <img
            src={
              conductor?.foto_conductor ||
              "https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg"
            }
            alt="Foto de perfil"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "4px solid #fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
          <h2 style={{ margin: "10px 0", fontSize: "1.8rem", color: "#333" }}>
            {perfil.nombre || "Nombre no disponible"}{" "}
            {perfil.apellido_paterno || ""} {perfil.apellido_materno || ""}
          </h2>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {email}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {perfil.celular || "Teléfono no disponible"}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {perfil.direccion || "Dirección no disponible"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            borderTop: "1px solid #eee",
            width: "100%",
          }}
        >
          <button
            style={{
              padding: "10px 15px",
              fontSize: "1rem",
              backgroundColor: "#d37012",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b25e0f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d37012")}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>

        <div style={{ padding: "20px", textAlign: "left", width: "100%" }}>
          <h3 style={{ marginBottom: "10px", color: "#333" }}>
            Información Adicional
          </h3>
          <ul style={{ paddingLeft: "20px", color: "#666" }}>
            <li>Usuario: {username}</li>
            <li>Roles: {roles.length > 0 ? roles.join(", ") : "Sin roles"}</li>
            <li>
              Fecha de nacimiento:{" "}
              {perfil.fecha_nacimiento?.split("T")[0] || "N/A"}
            </li>
          </ul>
        </div>

        {conductor && (
          <div
            style={{
              padding: "20px",
              textAlign: "left",
              width: "100%",
              backgroundColor: "#f9f9f9",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>
              Información de Conductor
            </h3>
            <ul style={{ paddingLeft: "20px", color: "#666" }}>
              <li>Celular de Contacto: {conductor.celular_contacto}</li>
              <li>
                Fecha de Registro:{" "}
                {new Date(conductor.conductor_created_at).toLocaleDateString()}
              </li>
            </ul>
          </div>
        )}

        {guia && (
          <div
            style={{
              padding: "20px",
              textAlign: "left",
              width: "100%",
              backgroundColor: "#eaf7ff",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>
              Información de Guía
            </h3>
            <ul style={{ paddingLeft: "20px", color: "#666" }}>
              <li>
                Número de Licencia de Turismo: {guia.numero_licencia_turismo}
              </li>
              <li>
                Idiomas Hablados:{" "}
                {guia.idioma_materno.length > 0
                  ? guia.idioma_materno.join(", ")
                  : "N/A"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
