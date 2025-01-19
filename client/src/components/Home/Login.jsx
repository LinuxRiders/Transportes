import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auto from "../../assets/svg_auto.png";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import api from "../../api/api";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmailR] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido_paterno, setApellidoPaterno] = useState("");
  const [apellido_materno, setApellidoMaterno] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userType, setUserType] = useState("");

  const [emaillogin, setEmail] = useState("");
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

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [idioma, setIdioma] = useState(""); // Almacena el idioma ingresado en el input
  const [idiomas, setIdiomas] = useState([]); // Array que contiene los idiomas seleccionados

  const handleAddIdioma = () => {
    if (idioma && !idiomas.includes(idioma)) {
      // Verifica que el idioma no esté repetido
      setIdiomas([...idiomas, idioma]); // Agrega el idioma al array
      setIdioma(""); // Limpia el campo de entrada
    }
  };

  const handleRemoveIdioma = (idiomaParaEliminar) => {
    setIdiomas(idiomas.filter((idioma) => idioma !== idiomaParaEliminar)); // Elimina el idioma seleccionado
  };

  async function handleSubmit() {
    try {
      const response = await api.post("/auth/login", {
        email: emaillogin,
        password: passwordlogin,
      });

      console.log("Respuesta del login:", response.data); // Verifica que el API devuelve el token
      login(response.data);

      console.log(
        "accessToken después de login:",
        localStorage.getItem("accessToken")
      ); // Verifica si el token está guardado

      setErrorMessage("");
      navigate("/perfil");
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      setErrorMessage(
        error.response?.data?.message || "Credenciales incorrectas"
      );
    }
  }

  async function handleRegisterUser() {
    try {
      // Validar que las contraseñas coincidan
      if (!passwordMatch) {
        setErrorMessage("Las contraseñas no coinciden");
        return;
      }

      // Validar que todos los campos obligatorios estén completos
      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !nombre ||
        !apellido_paterno ||
        !apellido_materno ||
        !fecha_nacimiento ||
        !celular ||
        !direccion
      ) {
        setErrorMessage("Por favor, complete todos los campos obligatorios");
        return;
      }

      // Construir el cuerpo de la solicitud con la estructura correcta
      const requestBody = {
        username,
        email,
        password,
        profile: {
          nombre,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento,
          celular,
          direccion,
        },
      };

      // --- LOGS DE DEPURACIÓN ---
      console.log("=== DEPURACIÓN: Campos enviados desde el FRONT ===");
      console.log("username:", username);
      console.log("email:", email);
      console.log("password:", password ? "********" : undefined); // Para no mostrar la contraseña real
      console.log("confirmPassword:", confirmPassword ? "********" : undefined);
      console.log("nombre:", nombre);
      console.log("apellido_paterno:", apellido_paterno);
      console.log("apellido_materno:", apellido_materno);
      console.log("fecha_nacimiento:", fecha_nacimiento);
      console.log("celular:", celular);
      console.log("direccion:", direccion);

      console.log(
        "=== DEPURACIÓN: requestBody que se envía al /users/full ==="
      );
      console.log(requestBody);
      // --- FIN LOGS DE DEPURACIÓN ---

      // Enviar la solicitud al backend
      const response = await api.post("/users/full", requestBody);

      const { data } = response.data;

      const idUser = data?.user?.user_id;

      if (userType === "Guía") {
        const resGuia = await api.post(`/users/assignGuia/${idUser}`, {
          numero_licencia_turismo: num_licencia_turismo,
          idioma_materno: idiomas,
        });
        // Lógica adicional para "Guía" si es necesario
        console.log(resGuia);
      } else if (userType === "Conductor") {
        const resConductor = await api.post(
          `/users/assignConductor/${idUser}`,
          {
            foto_conductor: foto_conductor,
            celular_contacto: tel_contacto,
          }
        );
        // Lógica adicional para "Conductor" si es necesario
        console.log(resConductor);
      } else {
        // Si no se selecciona ni "Guía" ni "Conductor"
        console.log("Por favor, selecciona un tipo de usuario válido.");
      }
      // Manejo exitoso
      console.log("Registro exitoso:", response.data);
      setErrorMessage("");
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setIsRegistering(false);
    } catch (error) {
      // Manejar errores
      console.error("Error al registrar:", error);
      setErrorMessage(
        error.response?.data?.error || "Error al registrar. Intente nuevamente."
      );
    }
  }

  const renderAdditionalFields = () => {
    switch (userType) {
      case "Conductor":
        return (
          <>
            <input
              type="text"
              placeholder="Teléfono de contacto"
              value={tel_contacto}
              onChange={(e) => setTelContacto(e.target.value)}
              style={inputStyle}
            />
            <label style={labelStyle}>
              Link Fotografía (obligatoria):
              <input
                type="text"
                placeholder="Link Foto"
                value={foto_conductor}
                onChange={(e) => setFotoConductor(e.target.value)}
                style={inputStyle}
              />
            </label>
          </>
        );
      case "Guía":
        return (
          <>
            <input
              type="text"
              placeholder="N° Licencia de Turismo"
              value={num_licencia_turismo}
              onChange={(e) => setLicenciaTurismo(e.target.value)}
              style={inputStyle}
            />
            <div>
              <label htmlFor="idioma">Idioma: </label>
              <input
                type="text"
                id="idioma"
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                placeholder="Escribe un idioma"
              />
              <button type="button" onClick={handleAddIdioma}>
                Agregar idioma
              </button>
            </div>

            <div>
              <h3>Idiomas seleccionados:</h3>
              <ul>
                {idiomas.map((idioma, index) => (
                  <li key={index}>
                    {idioma}
                    <button
                      type="button"
                      onClick={() => handleRemoveIdioma(idioma)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    fontSize: "1.2rem",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
  };

  const labelStyle = {
    display: "block",
    width: "80%",
    fontSize: "1.2rem",
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
    fontSize: "1rem",
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
    fontSize: "1rem",
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
          width: "70%",
          height: "70%",
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
              alt="Auto1"
              style={{
                width: "410px",
                height: "410px",
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
              alt="Auto2"
              style={{
                width: "410px",
                height: "410px",
                objectFit: "contain",
                filter: "invert(1) brightness(2)",
              }}
            />
          </div>
          <h1
            style={{
              zIndex: "1",
              marginTop: "80px",
              color: isRegistering ? "Black" : "#d37012",
            }}
          >
            {isRegistering ? "¡Hora de registrarse!" : "¡Bienvenido de Nuevo!"}
          </h1>
          <p style={{ zIndex: "1", fontSize: "1.1rem" }}>
            {isRegistering
              ? "Si ya tienes una cuenta ve a Iniciar Sesión"
              : "Si aún no tienes cuenta, registrate aquí"}
          </p>
          <button
            onClick={toggleMode}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1.2rem",
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
              <h1 style={{ marginBottom: "10%", marginTop: "5%" }}>Registro</h1>
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
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmailR(e.target.value)}
                style={inputStyle}
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <div style={{ position: "relative", width: "80%" }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
                    fontSize: "1.5rem",
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Apellido Paterno"
                value={apellido_paterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                value={apellido_materno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                style={inputStyle}
              />
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={fecha_nacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                style={inputStyle}
              />
              {userType && renderAdditionalFields()}
              {userType && (
                <>
                  {/**/}

                  {errorMessage && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "1rem",
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    onClick={handleRegisterUser}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#ff6100",
                      color: "#fff",
                      border: "none",
                      fontSize: "1.2rem",
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
                    Registrar
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h1 style={{ marginBottom: "10%", marginTop: "10%" }}>
                Iniciar Sesión
              </h1>
              <input
                type="text"
                placeholder="Usuario"
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                value={emaillogin}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ position: "relative", width: "80%" }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Contraseña"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1.2rem",
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
                    fontSize: "1.5rem",
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errorMessage && (
                <div
                  style={{
                    color: "red",
                    fontSize: "1rem",
                    marginTop: "2%",
                    marginBottom: "5%",
                    textAlign: "center",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff6100",
                  color: "#fff",
                  border: "none",
                  fontSize: "1.2rem",
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
