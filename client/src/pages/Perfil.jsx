import React, { useState } from "react";

const Perfil = () => {
  // Definir estados para los datos del usuario
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [address, setAddress] = useState("1234 Main St, Springfield, USA");
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg"
  );
  const [birthDate, setBirthDate] = useState("01/01/1990");
  const [memberSince, setMemberSince] = useState("15/05/2020");
  const [lastActivity, setLastActivity] = useState("10/01/2025");
  const [subscription, setSubscription] = useState("Premium");

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Encabezado */}
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

      {/* Contenedor principal */}
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
        {/* Foto de perfil */}
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
            src={profileImage}
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

        {/* Información del usuario */}
        <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
          <h2 style={{ margin: "10px 0", fontSize: "1.8rem", color: "#333" }}>
            {firstName} {lastName}
          </h2>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {email}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {phone}
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem", color: "#666" }}>
            {address}
          </p>
        </div>

        {/* Opciones del perfil */}
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
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Sección de datos adicionales */}
        <div style={{ padding: "20px", textAlign: "left", width: "100%" }}>
          <h3 style={{ marginBottom: "10px", color: "#333" }}>
            Información Adicional
          </h3>
          <ul style={{ paddingLeft: "20px", color: "#666" }}>
            <li>Fecha de nacimiento: {birthDate}</li>
            <li>Miembro desde: {memberSince}</li>
            <li>Última actividad: {lastActivity}</li>
            <li>Suscripción: {subscription}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
