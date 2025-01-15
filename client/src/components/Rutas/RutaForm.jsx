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

const EditableList = ({
  title,
  items,
  setItems,
  fields,
  relatedData,
  onSubmit,

  onDelete,
  onEdit,
}) => {
  const [newItem, setNewItem] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const handleFieldChange = (field, value, index = null) => {
    setNewItem((prev) => {
      if (Array.isArray(prev[field])) {
        const updatedArray = [...prev[field]];
        if (index !== null) {
          updatedArray[index] = value;
        }
        return { ...prev, [field]: updatedArray };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const handleAddOrEdit = async () => {
    if (editIndex !== null) {
      await onEdit(editIndex, newItem);
      setEditIndex(null);
    } else {
      await onSubmit(newItem);
    }
    setNewItem({});
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    onDelete(index);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    try {
      const updatedItems = items.map((item, index) =>
        index + 1 === newRow.id ? { ...item, ...newRow } : item
      );
      setItems(updatedItems);

      const index = newRow.id - 1;
      const updatedFields = { ...newRow };

      if (title === "Rutas") {
        await onEdit(index, updatedFields);
      } else if (title === "Lugares Turísticos") {
        await onEdit(index, updatedFields);
      }

      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return oldRow;
    }
  };

  // Agrega una nueva entrada de descripción
  const addDescripcion = () => {
    setNewItem((prev) => ({
      ...prev,
      descripcion: prev.descripcion ? [...prev.descripcion, ""] : [""],
    }));
  };

  // Elimina una entrada de descripción en el índice especificado
  const removeDescripcion = (idx) => {
    setNewItem((prev) => ({
      ...prev,
      descripcion: prev.descripcion.filter((_, index) => index !== idx),
    }));
  };

  return (
    <>
      <Accordion
        expanded={isAccordionOpen}
        onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        sx={{
          color: "#FFFFFF",
          border: `1px solid #FF6F00`,
          borderRadius: 4,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#FF6F00" }} />}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#FF6F00",
              borderBottom: "2px solid #FF6F00",
              width: "100%",
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {/* ----------------------- Muestra el contenido de la tabla -------------------- */}
            <List>
              {Array.isArray(items) &&
                items.slice(0, 2).map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEdit(index)}
                          sx={{ color: "#FFC107" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(index)}
                          sx={{ color: "#D32F2F" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {item.label ||
                              item.marca ||
                              item.tipo_combustible ||
                              item.tipo_vehiculo ||
                              item.tipo_carroceria ||
                              item.tipo_transmision}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        item.descripcion && (
                          <Typography
                            sx={{ color: "#757575" }}
                            dangerouslySetInnerHTML={{
                              __html: item?.descripcion,
                            }}
                          ></Typography>
                        )
                      }
                    />
                  </ListItem>
                ))}
            </List>
            {/* -------------------------------------------------------------------------------------------------------------------------------- */}
            <Box display="flex" flexDirection="column" gap={1}>
              {fields.map((field) =>
                field === "descripcion" ? (
                  <Box
                    key={field}
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {field}
                    </Typography>
                    {(newItem.descripcion || []).map((desc, idx) => (
                      <Box key={idx} display="flex" alignItems="center" gap={1}>
                        <Select
                          key={field}
                          value={newItem[field] || ""}
                          onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                          }
                          displayEmpty
                          fullWidth
                          variant="outlined"
                          sx={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 2,
                          }}
                        >
                          <MenuItem value="" disabled>
                            Seleccionar {field}
                          </MenuItem>
                          {relatedData?.map((carroceria) => (
                            <MenuItem
                              key={carroceria.idcarroceria}
                              value={carroceria.idcarroceria}
                            >
                              {carroceria.tipo_carroceria}
                            </MenuItem>
                          ))}
                        </Select>
                        {newItem.descripcion &&
                          newItem.descripcion.length > 1 && (
                            <IconButton
                              onClick={() => removeDescripcion(idx)}
                              sx={{ color: "#D32F2F" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                      </Box>
                    ))}
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={addDescripcion}
                      sx={{
                        color: "#FF6F00",
                        textTransform: "none",
                        alignSelf: "flex-start",
                      }}
                    >
                      Agregar {field}
                    </Button>
                  </Box>
                ) : field === "categoria_id" ? (
                  <Select
                    key={field}
                    value={newItem[field] || ""}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="" disabled>
                      Seleccionar {field}
                    </MenuItem>
                    {relatedData?.map((carroceria) => (
                      <MenuItem
                        key={carroceria.idcarroceria}
                        value={carroceria.idcarroceria}
                      >
                        {carroceria.tipo_carroceria}
                      </MenuItem>
                    ))}
                  </Select>
                ) : field === "precio" || field === "duracion" ? (
                  <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newItem[field] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleFieldChange(field, e.target.value);
                      }
                    }}
                    variant="outlined"
                    type="number"
                    fullWidth
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#121212",
                      borderRadius: 2,
                    }}
                  />
                ) : (
                  <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newItem[field] || ""}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#121212",
                      borderRadius: 2,
                    }}
                  />
                )
              )}
              <Button
                variant="contained"
                onClick={handleAddOrEdit}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#FF6F00",
                  color: "#FFFFFF",
                  "&:hover": { backgroundColor: "#E65100" },
                }}
              >
                {editIndex !== null ? "Editar" : "Agregar"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleDialogOpen}
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#FF6F00",
                  border: "1px solid #FF6F00",
                  "&:hover": { backgroundColor: "#FFF3E0" },
                }}
              >
                Ver más
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#FF6F00", color: "#FFFFFF" }}>
          {`Lista completa de ${title}`}
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={
                Array.isArray(items)
                  ? items.map((item, index) => ({ id: index + 1, ...item }))
                  : []
              }
              columns={fields.map((field) => ({
                field,
                headerName: field,
                width: 150,
                editable: true,
              }))}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
              processRowUpdate={handleProcessRowUpdate}
            />
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

const RutaForm = () => {
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);
  const [categoriasLugares, setCategoriasLugares] = useState([]);
  const [rutaLugares, setRutaLugares] = useState([]);
  const [selectedStep, setSelectedStep] = useState(0);
  const steps = [
    { label: "Categorías y Ruta Lugares" },
    { label: "Lugares Turísticos" },
  ];
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
  //============================Lugares Turisticos================================================

  useEffect(() => {
    async function getLugaTuri() {
      try {
        const response = await api.get("/lugares-turisticos");

        const { data } = response.data;

        setLugaresTuristicos(data);
      } catch (error) {}
    }

    getMarcas();
  }, []);

  async function handleAddLugaTuri(fields) {
    try {
      const response = await api.post("/lugares-turisticos", fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteLugaTuri(index) {
    try {
      const LugaTuri_id = marcas[index]?.id_marca;

      const response = await api.delete(`/lugares-turisticos/${LugaTuri_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditLugaTuri(index, fields) {
    try {
      const LugaTuri_id = marcas[index]?.id_marca;

      const response = await api.put(
        `/lugares-turisticos/${LugaTuri_id}`,
        fields
      );

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  //==============================================================================================

  const handleNextStep = () => {
    if (selectedStep < steps.length - 1) {
      setSelectedStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (selectedStep > 0) {
      setSelectedStep((prev) => prev - 1);
    }
  };
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
        {steps.map((step, index) => (
          <Box key={index} sx={{ textAlign: "center", flex: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor:
                  index === selectedStep ? "#FF6F00" : "lightgray",
                color: "white",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {index + 1}
            </Box>
            <Typography variant="subtitle2">{step.label}</Typography>
          </Box>
        ))}
      </Box>

      {selectedStep === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableList
              title="Categorías de Lugares"
              items={categoriasLugares}
              setItems={setCategoriasLugares}
              fields={["nombre_categoria", "descripcion"]}
              onSubmit={handleAddCategoria}
              onDelete={handleDeleteCategoria}
              onEdit={handleEditCategoria}
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
              onSubmit={handleAddRutaLugar}
              onDelete={handleDeleteRutaLugar}
              onEdit={handleEditRutaLugar}
            />
          </Grid>
        </Grid>
      )}
      {selectedStep === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableList
              title="Lugares Turísticos"
              items={lugaresTuristicos}
              setItems={setLugaresTuristicos}
              fields={["nombre", "descripcion", "categoria_id"]}
              onSubmit={handleAddLugar}
              onDelete={handleDeleteLugar}
              onEdit={handleEditLugar}
              relatedData={categoriasLugares}
            />
          </Grid>
        </Grid>
      )}

      {/* Controles de navegación */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        {selectedStep > 0 && (
          <Button
            variant="contained"
            onClick={handlePreviousStep}
            sx={{ backgroundColor: "#FF6F00" }}
          >
            Atrás
          </Button>
        )}
        {selectedStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNextStep}
            sx={{ backgroundColor: "#FF6F00", marginLeft: "auto" }}
          >
            Siguiente
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RutaForm;