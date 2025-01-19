import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Obtener usuarios con todos los datos
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/full", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const usersData = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setUsers(usersData);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setUsers([]); // Si hay un error, establece un array vacío
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar la edición de un usuario
  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      ...user,
      perfil: { ...user.perfil }, // Asegurarnos de que podemos editar cada campo por separado
      conductor: user.conductor ? { ...user.conductor } : null,
      guia: user.guia ? { ...user.guia } : null,
    });
  };

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado del usuario editado de manera correcta para los campos anidados
    setEditedUser((prevUser) => {
      if (name.startsWith("perfil")) {
        return {
          ...prevUser,
          perfil: {
            ...prevUser.perfil,
            [name.replace("perfil.", "")]: value,
          },
        };
      }

      if (name.startsWith("conductor")) {
        return {
          ...prevUser,
          conductor: {
            ...prevUser.conductor,
            [name.replace("conductor.", "")]: value,
          },
        };
      }

      if (name.startsWith("guia")) {
        return {
          ...prevUser,
          guia: {
            ...prevUser.guia,
            [name.replace("guia.", "")]: value,
          },
        };
      }

      return { ...prevUser, [name]: value };
    });
  };

  // Función para manejar el envío del formulario de edición
  const handleSubmitEdit = async () => {
    console.log("Datos a enviar:", editedUser); // Verifica los datos antes de enviarlos
    try {
      const response = await api.patch(`/users/full`, editedUser, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        console.log("Respuesta de la API:", response.data); // Verifica la respuesta de la API
        fetchUsers(); // Recargar los usuarios después de la actualización
        setEditingUserId(null); // Cerrar el formulario de edición
      } else {
        console.error("Error al guardar los cambios:", response);
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
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

      {editingUserId ? (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Editar Usuario</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Nombre:
              <input
                type="text"
                name="perfil.nombre"
                value={editedUser.perfil?.nombre || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Apellido Paterno:
              <input
                type="text"
                name="perfil.apellido_paterno"
                value={editedUser.perfil?.apellido_paterno || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Apellido Materno:
              <input
                type="text"
                name="perfil.apellido_materno"
                value={editedUser.perfil?.apellido_materno || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Correo:
              <input
                type="email"
                name="email"
                value={editedUser.email || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Celular:
              <input
                type="text"
                name="perfil.celular"
                value={editedUser.perfil?.celular || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="perfil.direccion"
                value={editedUser.perfil?.direccion || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Foto Conductor:
              <input
                type="text"
                name="conductor.foto_conductor"
                value={editedUser.conductor?.foto_conductor || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Celular Conductor:
              <input
                type="text"
                name="conductor.celular_contacto"
                value={editedUser.conductor?.celular_contacto || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Licencia Guía:
              <input
                type="text"
                name="guia.numero_licencia_turismo"
                value={editedUser.guia?.numero_licencia_turismo || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Idioma Materno (separar con comas):
              <input
                type="text"
                name="guia.idioma_materno"
                value={editedUser.guia?.idioma_materno?.join(", ") || ""}
                onChange={handleInputChange}
              />
            </label>
            <button
              type="button"
              onClick={handleSubmitEdit}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditingUserId(null)}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "90%",
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.2rem",
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
                <th style={{ padding: "12px", width: "80px" }}>ID</th>
                <th style={{ padding: "12px", width: "150px" }}>Nombre</th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Apellido Paterno
                </th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Apellido Materno
                </th>
                <th style={{ padding: "12px", width: "200px" }}>Correo</th>
                <th style={{ padding: "12px", width: "120px" }}>Rol</th>
                <th style={{ padding: "12px", width: "120px" }}>Estado</th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Fecha de Nacimiento
                </th>
                <th style={{ padding: "12px", width: "120px" }}>Celular</th>
                <th style={{ padding: "12px", width: "200px" }}>Dirección</th>
                <th style={{ padding: "12px", width: "200px" }}>
                  Conductor Foto
                </th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Conductor Celular
                </th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Guía Licencia
                </th>
                <th style={{ padding: "12px", width: "150px" }}>
                  Guía Idiomas
                </th>
                <th style={{ padding: "12px", width: "150px" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users
                  .filter(
                    (user) =>
                      user.status && user.status.toLowerCase() === "active"
                  ) // Filtrado por estado "activo"
                  .map((user) => (
                    <tr
                      key={user.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "10px" }}>{user.id}</td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.nombre || "No"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.apellido_paterno || "No"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.apellido_materno || "No"}
                      </td>
                      <td style={{ padding: "10px" }}>{user.email || "N/A"}</td>
                      <td style={{ padding: "10px" }}>
                        {user.roles.map((role) => role.name).join(", ") ||
                          "Sin rol"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.status || "Desconocido"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.fecha_nacimiento || "N/A"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.celular || "N/A"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.perfil?.direccion || "N/A"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.conductor ? (
                          <img
                            src={user.conductor.foto_conductor}
                            alt="Foto Conductor"
                            width="70"
                            height="70"
                          />
                        ) : (
                          "No"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.conductor?.celular_contacto || "N/A"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.guia ? user.guia.numero_licencia_turismo : "No"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {user.guia ? user.guia.idioma_materno.join(", ") : "No"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <button
                          onClick={() => handleEditUser(user)}
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
                        <button
                          onClick={() => handleDeleteUser(user.id, accessToken)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    No hay usuarios disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Función para cambiar el estado del usuario a inactivo (eliminar)
const handleDeleteUser = async (userId, accessToken) => {
  try {
    const response = await api.patch(
      `/users/full/${userId}`,
      { status: "inactive" }, // Cambiar el estado a inactivo
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.status === 200) {
      console.log("Usuario desactivado:", response.data);
      fetchUsers(); // Recargar la lista de usuarios después de la actualización
    } else {
      console.error("Error al desactivar el usuario:", response);
    }
  } catch (error) {
    console.error("Error al desactivar el usuario:", error);
  }
};

export default ManageUser;
