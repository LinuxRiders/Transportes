import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./FormCrearTerminal.css";

const FormCrearTerminal = () => {
  const [empresas, setEmpresas] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [terminales, setTerminales] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idCiudad, setIdCiudad] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresasRes, ciudadesRes, terminalesRes] = await Promise.all([
          api.get("/empresas"),
          api.get("/ciudades"),
          api.get("/terminales"),
        ]);
        setEmpresas(empresasRes.data.data || []);
        setCiudades(ciudadesRes.data.data || []);
        setTerminales(terminalesRes.data.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setErrorMessage("Error al cargar datos.");
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setNombre("");
    setDireccion("");
    setIdEmpresa("");
    setIdCiudad("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (editingId) {
        await api.put(`/terminales/${editingId}`, {
          nombre,
          direccion,
          id_empresa: idEmpresa,
          id_ciudad: idCiudad,
        });
        setSuccessMessage("Terminal actualizada exitosamente.");
      } else {
        await api.post("/terminales", {
          nombre,
          direccion,
          id_empresa: idEmpresa,
          id_ciudad: idCiudad,
        });
        setSuccessMessage("Terminal creada exitosamente.");
      }
      resetForm();
      const terminalesRes = await api.get("/terminales");
      setTerminales(terminalesRes.data.data || []);
    } catch (error) {
      console.error("Error al guardar la terminal:", error);
      setErrorMessage("Error al guardar la terminal.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (terminal) => {
    setNombre(terminal.nombre);
    setDireccion(terminal.direccion);
    setIdEmpresa(terminal.id_empresa);
    setIdCiudad(terminal.id_ciudad);
    setEditingId(terminal.id_terminal);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta terminal?"))
      return;

    try {
      await api.delete(`/terminales/${id}`);
      setSuccessMessage("Terminal eliminada exitosamente.");
      setTerminales(
        terminales.filter((terminal) => terminal.id_terminal !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la terminal:", error);
      setErrorMessage("Error al eliminar la terminal.");
    }
  };

  return (
    <div className="form-terminal-container">
      <h2>{editingId ? "Editar Terminal" : "Crear Terminal"}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form-terminal">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Empresa:</label>
          <select
            value={idEmpresa}
            onChange={(e) => setIdEmpresa(e.target.value)}
            required
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id_empresa} value={empresa.id_empresa}>
                {empresa.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <select
            value={idCiudad}
            onChange={(e) => setIdCiudad(e.target.value)}
            required
          >
            <option value="">Seleccione una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading
            ? "Guardando..."
            : editingId
            ? "Actualizar Terminal"
            : "Crear Terminal"}
        </button>
      </form>

      <h2>Lista de Terminales</h2>
      <table className="terminal-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Empresa</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {terminales.map((terminal) => (
            <tr key={terminal.id_terminal}>
              <td>{terminal.nombre}</td>
              <td>{terminal.direccion}</td>
              <td>
                {empresas.find((e) => e.id_empresa === terminal.id_empresa)
                  ?.nombre || "N/A"}
              </td>
              <td>
                {ciudades.find((c) => c.id_ciudad === terminal.id_ciudad)
                  ?.nombre || "N/A"}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(terminal)}
                  className="edit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(terminal.id_terminal)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormCrearTerminal;
