import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const FormGestionEmpresas = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    ruc: "",
  });
  const [empresas, setEmpresas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await api.get("/empresas");
      setEmpresas(response.data.data);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
      setErrorMessage("Ocurrió un error al cargar las empresas.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (editingId) {
        await api.put(`/empresas/${editingId}`, formData);
        setSuccessMessage("Empresa actualizada exitosamente.");
      } else {
        await api.post("/empresas", formData);
        setSuccessMessage("Empresa creada exitosamente.");
      }
      setFormData({ nombre: "", direccion: "", telefono: "", ruc: "" });
      setEditingId(null);
      fetchEmpresas();
    } catch (error) {
      console.error("Error al guardar la empresa:", error);
      setErrorMessage("Ocurrió un error al guardar la empresa.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (empresa) => {
    setFormData({
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      ruc: empresa.ruc,
    });
    setEditingId(empresa.id_empresa);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
      return;
    }

    try {
      await api.delete(`/empresas/${id}`);
      setSuccessMessage("Empresa eliminada exitosamente.");
      fetchEmpresas();
    } catch (error) {
      console.error("Error al eliminar la empresa:", error);
      setErrorMessage("Ocurrió un error al eliminar la empresa.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#fff", // Fondo blanco
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          color: "#ff6100", // Naranja
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {editingId ? "Editar Empresa" : "Crear Empresa"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Empresa"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="RUC"
          name="ruc"
          value={formData.ruc}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ff6100",
            color: "#fff",
            "&:hover": { backgroundColor: "#e65a00" },
            marginTop: "20px",
          }}
          fullWidth
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : editingId
            ? "Actualizar Empresa"
            : "Crear Empresa"}
        </Button>
      </form>
      {successMessage && (
        <Typography
          sx={{ color: "#4caf50", marginTop: "20px", textAlign: "center" }}
        >
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography
          sx={{ color: "#f44336", marginTop: "20px", textAlign: "center" }}
        >
          {errorMessage}
        </Typography>
      )}

      <Typography
        variant="h5"
        sx={{
          marginTop: "40px",
          marginBottom: "20px",
          color: "#565656", // Gris oscuro
          fontWeight: "bold",
        }}
      >
        Lista de Empresas
      </Typography>
      <Table
        sx={{
          "& th": {
            backgroundColor: "#565656",
            color: "#fff",
          },
          "& td": {
            color: "#000",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>RUC</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow key={empresa.id_empresa}>
              <TableCell>{empresa.nombre}</TableCell>
              <TableCell>{empresa.direccion}</TableCell>
              <TableCell>{empresa.telefono}</TableCell>
              <TableCell>{empresa.ruc}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(empresa)}
                  sx={{ color: "#ff6100" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(empresa.id_empresa)}
                  sx={{ color: "#f44336" }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default FormGestionEmpresas;
