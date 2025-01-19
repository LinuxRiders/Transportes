import React, { useState, useEffect } from "react";
import api from "../api/api";

const Perfil = () => {
  const [userData, setUserData] = useState(() => {
    // Intenta recuperar los datos desde localStorage al cargar
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [loading, setLoading] = useState(!userData); // Si hay datos en localStorage, no carga

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/me");
        setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data)); // Guardar en localStorage
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    // Solo hace la petición si no hay datos almacenados
    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (!userData) {
    return <p>No se pudo cargar el perfil del usuario.</p>;
  }

  // Extraer datos del JSON
  const { username, email, roles = [], perfil = {} } = userData;

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
          color: "#fff",
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
            src="https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg"
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
            {perfil.nombre} {perfil.apellido_paterno} {perfil.apellido_materno}
          </h2>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            Usuario: {username}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            Email: {email}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            Celular: {perfil.celular || "No disponible"}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            Dirección: {perfil.direccion || "No disponible"}
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
            onClick={() => {
              localStorage.removeItem("userData"); // Limpiar datos al cerrar sesión
              window.location.href = "/login";
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b25e0f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d37012")}
          >
            Cerrar Sesión
          </button>
        </div>

        <div style={{ padding: "20px", textAlign: "left", width: "100%" }}>
          <h3 style={{ marginBottom: "10px", color: "#333" }}>
            Información Adicional
          </h3>
          <ul style={{ paddingLeft: "20px", color: "#666" }}>
            <li>Fecha de nacimiento: {perfil.fecha_nacimiento || "N/A"}</li>
            <li>Roles: {roles.join(", ") || "Sin roles"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
