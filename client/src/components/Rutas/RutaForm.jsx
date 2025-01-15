import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Button,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/api";
import ReactQuill from "react-quill";
import EditableList from "../EditableList";

const RutaForm = () => {
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);
  const [categoriasLugares, setCategoriasLugares] = useState([]);

  const [selectedStep, setSelectedStep] = useState(0);

  //============================Categorias Lugares================================================
  useEffect(() => {
    async function getCategorias() {
      try {
        const response = await api.get("/categorias-lugares");

        const { data } = response.data;

        setCategoriasLugares(data);
      } catch (error) {}
    }

    getCategorias();
  }, []);

  async function handleAddCategorias(fields) {
    try {
      const response = await api.post("/categorias-lugares", fields);

      const { data } = response.data;
      setCategoriasLugares((prev) => [...prev, data]);
      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteCategorias(index) {
    try {
      const categoria_id = categoriasLugares[index]?.id_categoria_lugares;

      const response = await api.delete(`/categorias-lugares/${categoria_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditCategorias(index, fields) {
    try {
      const categoria_id = categoriasLugares[index]?.id_categoria_lugares;

      const response = await api.put(
        `/categorias-lugares/${categoria_id}`,
        fields
      );

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  //==============================================================================================

  return (
    <Box sx={{ padding: 2 }}>
      {/* Indicador de pasos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableList
              title="Categorias Rutas"
              items={categoriasLugares}
              setItems={setCategoriasLugares}
              fields={["nombre_categoria", "descripcion"]}
              onSubmit={handleAddCategorias}
              onDelete={handleDeleteCategorias}
              onEdit={handleEditCategorias}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RutaForm;
