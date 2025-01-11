import React, { useState } from "react";
import auto from "../../assets/svg_auto.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            transition: "all 0.8s ease-in-out",
            transform: isRegistering ? "translateX(-100%)" : "translateX(0)",
            position: "absolute",
            width: "50%",
            height: "100%",
            right: "0",
          }}
        >
          {isRegistering ? (
            <>
              <h2 style={{ marginBottom: "20px" }}>Registro</h2>
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
              />
              <input
                type="email"
                placeholder="Correo"
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <div style={{ position: "relative", width: "80%" }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Contraseña"
                  id="password-input"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    paddingRight: "40px",
                  }}
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
                type="name"
                placeholder="Nombre completo"
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <input
                type="phoner"
                placeholder="Número de celular"
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
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
          ) : (
            <>
              <h2 style={{ marginBottom: "20px" }}>Iniciar Sesión</h2>
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
              />
              <div style={{ position: "relative", width: "80%" }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Contraseña"
                  id="password-input"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    paddingRight: "40px",
                  }}
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
