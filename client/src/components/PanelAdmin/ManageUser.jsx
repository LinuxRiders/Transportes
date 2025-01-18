import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { FaEdit, FaSave } from "react-icons/fa";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Obtener roles
  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRoles(response.data.data); // Guardar los roles en el estado
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Guardar cambios de rol
  const saveRole = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === id ? { ...user, role: newRole || user.role } : user
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
                key={user.user_id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.3s ease",
                }}
              >
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>correo@example.com</td>
                <td style={{ padding: "10px" }}>
                  {editingUserId === user.user_id ? (
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
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role || "Usuario"
                  )}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {editingUserId === user.user_id ? (
                    <button
                      onClick={() => saveRole(user.user_id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FaSave /> Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingUserId(user.user_id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#d37012",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
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
