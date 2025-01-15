import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

const ManageUser = () => {
  // Datos de ejemplo para los usuarios
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Usuario" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Guía",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Conductor",
    },
    {
      id: 4,
      name: "Anna Brown",
      email: "anna.brown@example.com",
      role: "Administrador",
    },
  ]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Función para guardar el cambio de rol
  const saveRole = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole || user.role } : user
      )
    );
    setEditingUserId(null);
    setNewRole("");
  };

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
          backgroundColor: "#d37012",
          color: "#fff",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Gestión de Usuarios</h1>
      </header>

      {/* Contenedor principal */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Tabla de usuarios */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1rem",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#d37012",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "10px" }}>Nombre</th>
              <th style={{ padding: "10px" }}>Correo</th>
              <th style={{ padding: "10px" }}>Rol</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>
                  {editingUserId === user.id ? (
                    <select
                      value={newRole || user.role}
                      onChange={(e) => setNewRole(e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                      }}
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Guía">Guía</option>
                      <option value="Conductor">Conductor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {editingUserId === user.id ? (
                    <button
                      onClick={() => saveRole(user.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#45a049")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#4CAF50")
                      }
                    >
                      <FaSave /> Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingUserId(user.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#d37012",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#b25e0f")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#d37012")
                      }
                    >
                      <FaEdit /> Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
