import React, { useState } from "react";
import auto from "../../assets/svg_auto.png";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import api from "../../api/api";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userType, setUserType] = useState("");

  const [email, setEmail] = useState("");
  const [passwordlogin, setPasswordLogin] = useState("");

  const { login, getRols, user, isAuthenticated, logOut } = useAuth();

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  async function handleSubmit() {
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: passwordlogin,
      });

      login(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const renderAdditionalFields = () => {
    switch (userType) {
      case "Cliente":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              style={inputStyle}
            />
            <input type="text" placeholder="Apellido(s)" style={inputStyle} />
            <input
              type="email"
              placeholder="Correo electrónico"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Teléfono de contacto"
              style={inputStyle}
            />
            <input type="text" placeholder="Dirección" style={inputStyle} />
            <input
              type="text"
              placeholder="Documento de identidad (DNI)"
              style={inputStyle}
            />
          </>
        );
      case "Conductor":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              style={inputStyle}
            />
            <input type="text" placeholder="Apellido(s)" style={inputStyle} />
            <input
              type="text"
              placeholder="Teléfono de contacto"
              style={inputStyle}
            />
            <input type="text" placeholder="Dirección" style={inputStyle} />
            <input
              type="text"
              placeholder="Documento de identidad (DNI)"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Número de licencia"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Categoría de licencia"
              style={inputStyle}
            />
            <input
              type="date"
              placeholder="Fecha de expiración de licencia"
              style={inputStyle}
            />
          </>
        );
      case "Guía":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              style={inputStyle}
            />
            <input type="text" placeholder="Apellido(s)" style={inputStyle} />
            <input
              type="email"
              placeholder="Correo electrónico"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Teléfono de contacto"
              style={inputStyle}
            />
            <input type="text" placeholder="Dirección" style={inputStyle} />
            <input
              type="text"
              placeholder="Documento de identidad (DNI)"
              style={inputStyle}
            />
            <input type="text" placeholder="Idioma nativo" style={inputStyle} />
            <input
              type="text"
              placeholder="Idiomas hablados (agregar más separados por comas)"
              style={inputStyle}
            />
          </>
        );
      default:
        return null;
    }
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
  };

  const labelStyle = {
    display: "block",
    width: "80%",
    marginBottom: "10px",
    fontWeight: "bold",
    opacity: userType ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  const fileButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    backgroundColor: "#d37012",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  };

  const fileInputStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  };

  const passwordMismatchStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "-10px",
    marginBottom: "10px",
    opacity: userType ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  const scrollStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    transition: "all 0.8s ease-in-out",
    transform: isRegistering ? "translateX(-100%)" : "translateX(0)",
    position: "absolute",
    width: "50%",
    height: "100%",
    right: "0",
    overflowY: "auto",
    padding: "20px",
    scrollbarWidth: "thin",
    scrollbarColor: "black #e0e0e0",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "400px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.26)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isRegistering ? "#d37012" : "black",
            color: "#fff",
            transition: "all 0.8s ease-in-out",
            transform: isRegistering ? "translateX(100%)" : "translateX(0)",
            position: "absolute",
            width: "50%",
            height: "100%",
            left: "0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: isRegistering
                ? "translate(-50%, -50%)"
                : "translate(-85%, -50%)",
              transition: "transform 1.8s ease",
              zIndex: "0",
            }}
          >
            <img
              src={auto}
              alt="Decorative"
              style={{
                width: "350px",
                height: "350px",
                objectFit: "contain",
                filter: "invert(1) brightness(2)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: isRegistering
                ? "translate(-50%, -50%)"
                : "translate(-5%, -50%)",
              transition: "transform 1.8s ease",
              zIndex: "0",
            }}
          >
            <img
              src={auto}
              alt="Decorative"
              style={{
                width: "350px",
                height: "350px",
                objectFit: "contain",
                filter: "invert(1) brightness(2)",
              }}
            />
          </div>
          <h2
            style={{
              zIndex: "1",
              marginTop: "80px",
              color: isRegistering ? "Black" : "#d37012",
            }}
          >
            {isRegistering ? "¡Hora de registrarse!" : "¡Bienvenido de Nuevo!"}
          </h2>
          <p style={{ zIndex: "1" }}>
            {isRegistering
              ? "Si ya tienes una cuenta ve a Iniciar Sesión"
              : "Si aún no tienes cuenta, registrate aquí"}
          </p>
          <button
            onClick={toggleMode}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#fff",
              color: isRegistering ? "black" : "#d37012",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              zIndex: "1",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isRegistering ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </div>

        {/* Right Section */}
        <div style={scrollStyle}>
          {isRegistering ? (
            <>
              <h2 style={{ marginBottom: "20px" }}>Registro</h2>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{
                  ...inputStyle,
                  marginBottom: "20px",
                  opacity: 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <option value="">Seleccione un tipo de usuario</option>
                <option value="Cliente">Cliente</option>
                <option value="Conductor">Conductor</option>
                <option value="Guía">Guía</option>
              </select>
              {userType && renderAdditionalFields()}
              {userType && (
                <>
                  <div style={{ position: "relative", width: "80%" }}>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Contraseña"
                      value={password}
                      onChange={handlePasswordChange}
                      style={inputStyle}
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={{
                        position: "absolute",
                        top: "35%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={inputStyle}
                  />
                  {!passwordMatch && (
                    <div style={passwordMismatchStyle}>
                      Las contraseñas no coinciden
                    </div>
                  )}
                  <label style={labelStyle}>
                    Fotografía (obligatoria):
                    <button style={fileButtonStyle}>
                      <FaUpload style={{ marginRight: "8px" }} /> Subir
                      Fotografía
                      <input
                        type="file"
                        accept="image/*"
                        style={fileInputStyle}
                      />
                    </button>
                  </label>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "black",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Registrarse
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: "20%" }}>Iniciar Sesión</h2>
              <input
                type="text"
                placeholder="Usuario"
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ position: "relative", width: "80%" }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Contraseña"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    paddingRight: "40px",
                  }}
                  value={passwordlogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
                <span
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{
                    position: "absolute",
                    top: "35%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff6100",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Ingresar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
