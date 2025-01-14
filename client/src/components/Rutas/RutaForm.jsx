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
  const [rutas, setRutas] = useState([]);
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);
  const [categoriasLugares, setCategoriasLugares] = useState([]);
  const [rutaLugares, setRutaLugares] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [selectedStep, setSelectedStep] = useState(0);
  const steps = [
    { label: "Categorías y Ruta Lugares" },
    { label: "Lugares Turísticos" },
  ];
  //==========================================================
  useEffect(() => {
    async function getRutas() {
      try {
        const response = await api.get("/ruta");
        const { data } = response.data;
        setRutas(data);
      } catch (error) {
        console.error(error);
      }
    }
    getRutas();
  }, []);

  async function handleAddRuta(fields) {
    try {
      const response = await api.post("/ruta", fields);
      const { data } = response.data;
      if (data) {
        setRutas((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteRuta(index) {
    try {
      const ruta_id = rutas[index]?.id_rutas;
      if (!ruta_id) return;
      await api.delete(`/ruta/${ruta_id}`);
      setRutas((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditRuta(index, fields) {
    try {
      const ruta_id = rutas[index]?.id_rutas;
      if (!ruta_id) return;
      await api.put(`/ruta/${ruta_id}`, fields);
      setRutas((prev) =>
        prev.map((ruta, i) => (i === index ? { ...ruta, ...fields } : ruta))
      );
    } catch (error) {
      console.error(error);
    }
  }
  //================================================================
  useEffect(() => {
    async function getData() {
      try {
        const lugaresResponse = await api.get("/lugares_turisticos");
        const categoriasResponse = await api.get("/categorias_lugares");
        setLugaresTuristicos(lugaresResponse.data.data);
        setCategoriasLugares(categoriasResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  async function handleAddLugar(fields) {
    try {
      const response = await api.post("/lugares_turisticos", fields);
      const { data } = response.data;
      if (data) {
        setLugaresTuristicos((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteLugar(index) {
    try {
      const lugar_id = lugaresTuristicos[index]?.id_lugares_turisticos;
      if (!lugar_id) return;
      await api.delete(`/lugares_turisticos/${lugar_id}`);
      setLugaresTuristicos((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditLugar(index, fields) {
    try {
      const lugar_id = lugaresTuristicos[index]?.id_lugares_turisticos;
      if (!lugar_id) return;
      await api.put(`/lugares_turisticos/${lugar_id}`, fields);
      setLugaresTuristicos((prev) =>
        prev.map((lugar, i) => (i === index ? { ...lugar, ...fields } : lugar))
      );
    } catch (error) {
      console.error(error);
    }
  }
  //============================================================================
  useEffect(() => {
    async function getCategorias() {
      try {
        const response = await api.get("/categorias_lugares");
        setCategoriasLugares(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCategorias();
  }, []);

  async function handleAddCategoria(fields) {
    try {
      const response = await api.post("/categorias_lugares", fields);
      const { data } = response.data;
      if (data) {
        setCategoriasLugares((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteCategoria(index) {
    try {
      const categoria_id = categoriasLugares[index]?.Id_catefgoria_lugares;
      if (!categoria_id) return;
      await api.delete(`/categorias_lugares/${categoria_id}`);
      setCategoriasLugares((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditCategoria(index, fields) {
    try {
      const categoria_id = categoriasLugares[index]?.Id_catefgoria_lugares;
      if (!categoria_id) return;
      await api.put(`/categorias_lugares/${categoria_id}`, fields);
      setCategoriasLugares((prev) =>
        prev.map((categoria, i) =>
          i === index ? { ...categoria, ...fields } : categoria
        )
      );
    } catch (error) {
      console.error(error);
    }
  }
  //================================================================
  useEffect(() => {
    async function getData() {
      try {
        const [rutaResponse, lugarResponse, rutaLugarResponse] =
          await Promise.all([
            api.get("/ruta"),
            api.get("/lugares_turisticos"),
            api.get("/ruta_lugares"),
          ]);
        setRutas(rutaResponse.data.data);
        setLugaresTuristicos(lugarResponse.data.data);
        setRutaLugares(rutaLugarResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  async function handleAddRutaLugar(fields) {
    try {
      const response = await api.post("/ruta_lugares", fields);
      const { data } = response.data;
      if (data) {
        setRutaLugares((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteRutaLugar(index) {
    try {
      const ruta_lugar_id = rutaLugares[index]?.id_ruta_lugares;
      if (!ruta_lugar_id) return;
      await api.delete(`/ruta_lugares/${ruta_lugar_id}`);
      setRutaLugares((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditRutaLugar(index, fields) {
    try {
      const ruta_lugar_id = rutaLugares[index]?.id_ruta_lugares;
      if (!ruta_lugar_id) return;
      await api.put(`/ruta_lugares/${ruta_lugar_id}`, fields);
      setRutaLugares((prev) =>
        prev.map((rl, i) => (i === index ? { ...rl, ...fields } : rl))
      );
    } catch (error) {
      console.error(error);
    }
  }
  //================================================================
  useEffect(() => {
    async function getViajes() {
      try {
        const response = await api.get("/viajes");
        setViajes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getViajes();
  }, []);

  async function handleAddViaje(fields) {
    try {
      const response = await api.post("/viajes", fields);
      const { data } = response.data;
      if (data) {
        setViajes((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteViaje(index) {
    try {
      const viaje_id = viajes[index]?.Id_viaje;
      if (!viaje_id) return;
      await api.delete(`/viajes/${viaje_id}`);
      setViajes((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditViaje(index, fields) {
    try {
      const viaje_id = viajes[index]?.Id_viaje;
      if (!viaje_id) return;
      await api.put(`/viajes/${viaje_id}`, fields);
      setViajes((prev) =>
        prev.map((viaje, i) => (i === index ? { ...viaje, ...fields } : viaje))
      );
    } catch (error) {
      console.error(error);
    }
  }
  //============================================================================
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

      {/* Contenido del paso */}
      {/* {selectedStep === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableList
              title="Rutas"
              items={rutas}
              setItems={setRutas}
              fields={["nombre_ruta", "descripcion", "duracion", "precio"]}
              onSubmit={handleAddRuta}
              onDelete={handleDeleteRuta}
              onEdit={handleEditRuta}
            />
          </Grid>
        </Grid>
      )}

      {selectedStep === 2 && (
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
      )} */}

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
      {/* {selectedStep === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableList
              title="Viajes"
              items={viajes}
              setItems={setViajes}
              fields={[
                "ruta_id",
                "vehiculo_id",
                "Terminal_id_origen",
                "Terminal_id_destino",
                "fecha_inicio",
                "fecha_fin",
                "estado",
              ]}
              onSubmit={handleAddViaje}
              onDelete={handleDeleteViaje}
              onEdit={handleEditViaje}
            />
          </Grid>
        </Grid>
      )} */}

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
