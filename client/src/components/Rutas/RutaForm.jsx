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
  const [rutaLugares, setRutaLugares] = useState([]);
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

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteCategorias(index) {
    try {
      const categoria_id = categoriasLugares[index]?.idcategorias_lugares;

      const response = await api.delete(`/categorias-lugares/${categoria_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditCategorias(index, fields) {
    try {
      const categoria_id = marcas[index]?.idcategorias_lugares;

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

  //============================Ruta Lugares======================================================
  useEffect(() => {
    async function getRutas() {
      try {
        const response = await api.get("/rutas-lugares");

        const { data } = response.data;

        setRutaLugares(data);
      } catch (error) {}
    }

    getRutas();
  }, []);

  async function handleAddRutas(fields) {
    try {
      const response = await api.post("/rutas-lugares", fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteRutas(index) {
    try {
      const lugares_id = marcas[index]?.id_marca;

      const response = await api.delete(`/rutas-lugares/${lugares_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditRutas(index, fields) {
    try {
      const lugares_id = marcas[index]?.id_marca;

      const response = await api.put(`/rutas-lugares/${lugares_id}`, fields);

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
              title="Categorías de Lugares"
              items={categoriasLugares}
              setItems={setCategoriasLugares}
              fields={["nombre_categoria", "descripcion"]}
              onSubmit={handleAddCategorias}
              onDelete={handleDeleteCategorias}
              onEdit={handleEditCategorias}
            />
          </Grid>
          <Grid item xs={12}>
            <EditableList
              title="Ruta Lugares"
              items={rutaLugares}
              setItems={setRutaLugares}
              fields={[
                "ruta_id",
                "lugar_turistico_id",
                "orden_visita",
                "tiempo_estancia",
              ]}
              onSubmit={handleAddRutas}
              onDelete={handleDeleteRutas}
              onEdit={handleEditRutas}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RutaForm;
