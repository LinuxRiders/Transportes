import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaEdit, FaSave, FaSignOutAlt, MdDelete } from "react-icons/fa";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  // Obtener usuarios con sus roles
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/roles", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(response.data.data); // Guardar los usuarios con roles
    } catch (error) {
      console.error("Error al obtener usuarios con roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  // Función de logout
  const logout = async (navigate) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (!refreshToken) {
      console.error("No se encontró el refreshToken. Redirigiendo a login...");
      localStorage.removeItem("accessToken"); // Asegura que los tokens se eliminen
      localStorage.removeItem("refreshToken");
      navigate("/Login");
      return; // Salimos de la función
    }

    try {
      const response = await api.post(
        "/auth/logout",
        { refresh_token: refreshToken },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 204) {
        console.log("Sesión cerrada correctamente.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/Login"); // Redirigir aunque haya error
    }
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
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Gestión de Usuarios</h1>

        {/* Botón de cerrar sesión */}
        <button
          onClick={() => logout(navigate)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#d37012",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
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
              <th style={{ padding: "10px" }}>Estado</th>
              <th style={{ padding: "10px" }}>Creado</th>
              <th style={{ padding: "10px" }}>Actualizado</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>{user.email || "N/A"}</td>
                <td style={{ padding: "10px" }}>
                  {user.roles.map((role) => role.name).join(", ") || "Sin rol"}
                </td>
                <td style={{ padding: "10px" }}>
                  {user.status || "Desconocido"}
                </td>
                <td style={{ padding: "10px" }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: "10px" }}>
                  {new Date(user.updated_at).toLocaleDateString()}
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
                  <button
                    onClick={() => setEditingUserId(user.user_id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#e85948",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <MdDelete /> Eliminar
                  </button>
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
