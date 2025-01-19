import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../api/api";
import { DataGrid } from "@mui/x-data-grid";

function CategoriasEditor() {
  const [categorias, setCategorias] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Cargar categorías desde la API
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/categorias-lugares");
        setCategorias(response.data.data || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    })();
  }, []);

  // Abrir modal con datos de la categoría seleccionada
  const handleOpenModal = (categoria) => {
    setEditingCategory(categoria ? { ...categoria } : null);
    setOpenModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setEditingCategory(null);
    setOpenModal(false);
  };

  // Manejar cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios en la categoría
  const handleSave = async () => {
    if (!editingCategory) return;

    try {
      const { id_categoria_lugares, nombre_categoria, descripcion } =
        editingCategory;
      const response = await api.put(
        `/categorias-lugares/${id_categoria_lugares}`,
        {
          nombre_categoria,
          descripcion,
        }
      );

      const updatedCategory = response.data.data;

      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id_categoria_lugares === updatedCategory.id_categoria_lugares
            ? updatedCategory
            : cat
        )
      );

      handleCloseModal();
      alert("¡Categoría actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Ocurrió un error al actualizar la categoría.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Editor de Categorías
      </Typography>

      {/* Tabla de categorías */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((cat) => (
            <TableRow key={cat.id_categoria_lugares}>
              <TableCell>{cat.id_categoria_lugares}</TableCell>
              <TableCell>{cat.nombre_categoria}</TableCell>
              <TableCell>{cat.descripcion}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenModal(cat)}
                  aria-label="Editar"
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de edición */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Categoría</DialogTitle>
        <DialogContent dividers>
          {editingCategory && (
            <>
              <TextField
                label="Nombre de la Categoría"
                name="nombre_categoria"
                value={editingCategory.nombre_categoria || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción"
                name="descripcion"
                value={editingCategory.descripcion || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CategoriasEditor;
