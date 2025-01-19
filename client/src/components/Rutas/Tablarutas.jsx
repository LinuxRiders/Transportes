import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Button,
  Modal,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api";

const Tablarutas = () => {
  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas
  const [editMode, setEditMode] = useState(null); // ID de la fila en edición
  const [editedRow, setEditedRow] = useState({}); // Almacena los cambios en la fila editada
  const [openModal, setOpenModal] = useState(false); // Controla el estado del modal

  useEffect(() => {
    async function getRutasBD() {
      try {
        const response = await api.get("/rutas");
        const { data } = response.data; // Ajustar según la estructura de la API
        setRutas(data);
      } catch (error) {
        console.error("Error al cargar rutas:", error);
      }
    }
    getRutasBD();
  }, []);

  const handleEditClick = (id) => {
    if (editMode === id) {
      // Guardar cambios
      api
        .put(`/rutas/${id}`, editedRow)
        .then(() => {
          setRutas((prev) =>
            prev.map((ruta) =>
              ruta.id_rutas === id ? { ...ruta, ...editedRow } : ruta
            )
          );
          setEditMode(null);
          setEditedRow({});
        })
        .catch((error) => console.error("Error al guardar cambios:", error));
    } else {
      // Activar modo edición
      setEditMode(id);
      setEditedRow(rutas.find((ruta) => ruta.id_rutas === id));
    }
  };

  const handleDeleteClick = (id) => {
    api
      .delete(`/rutas/${id}`)
      .then(() => {
        setRutas((prev) => prev.filter((ruta) => ruta.id_rutas !== id));
      })
      .catch((error) => console.error("Error al eliminar ruta:", error));
  };

  const handleInputChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          width: "100%",
          maxHeight: "300px", // Altura fija
          overflow: "auto", // Agrega scroll si hay más datos
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#6c757d" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Duración</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Precio</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rutas.map((ruta) => (
              <TableRow
                key={ruta.id_rutas}
                sx={{
                  backgroundColor:
                    rutas.indexOf(ruta) % 2 === 0 ? "#f1f3f5" : "#ffffff",
                }}
              >
                <TableCell>
                  {editMode === ruta.id_rutas ? (
                    <input
                      value={editedRow.nombre_ruta || ""}
                      onChange={(e) => handleInputChange(e, "nombre_ruta")}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    ruta.nombre_ruta
                  )}
                </TableCell>
                <TableCell>
                  {editMode === ruta.id_rutas ? (
                    <input
                      value={editedRow.descripcion || ""}
                      onChange={(e) => handleInputChange(e, "descripcion")}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    ruta.descripcion
                  )}
                </TableCell>
                <TableCell>
                  {editMode === ruta.id_rutas ? (
                    <input
                      value={editedRow.duracion || ""}
                      onChange={(e) => handleInputChange(e, "duracion")}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    ruta.duracion
                  )}
                </TableCell>
                <TableCell>
                  {editMode === ruta.id_rutas ? (
                    <input
                      value={editedRow.precio || ""}
                      onChange={(e) => handleInputChange(e, "precio")}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    ruta.precio
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    sx={{ color: "#FF6F00" }}
                    onClick={() => handleEditClick(ruta.id_rutas)}
                  >
                    {editMode === ruta.id_rutas ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteClick(ruta.id_rutas)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ marginTop: "10px" }}
        onClick={() => setOpenModal(true)}
      >
        Ver más
      </Button>

      {/* Modal para mostrar todos los datos */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "auto", // Scroll para contenido extenso
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#6c757d" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Nombre</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>Descripción</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>Duración</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rutas.map((ruta) => (
                <TableRow
                  key={ruta.id_rutas}
                  sx={{
                    backgroundColor:
                      rutas.indexOf(ruta) % 2 === 0 ? "#f1f3f5" : "#ffffff",
                  }}
                >
                  <TableCell>{ruta.nombre_ruta}</TableCell>
                  <TableCell>{ruta.descripcion}</TableCell>
                  <TableCell>{ruta.duracion}</TableCell>
                  <TableCell>{ruta.precio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};

export default Tablarutas;
