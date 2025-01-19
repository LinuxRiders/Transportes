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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import BuildIcon from "@mui/icons-material/Build";
import SyncIcon from "@mui/icons-material/Sync";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/api";
const EditableListt = ({
  title,
  items,
  setItems,
  fields,
  iconOptions,
  relatedData,
  onSubmit,
  onDelete,
  onEdit,
}) => {
  const [newItem, setNewItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleFieldChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
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

      if (title === "Marcas") {
        await onEdit(index, updatedFields);
      } else if (title === "Tipos de Combustible") {
        await onEdit(index, updatedFields);
      } else if (title === "Tipos de Vehículo") {
        await onEdit(index, updatedFields);
      } else if (title === "Tipos de Carrocería") {
        await onEdit(index, updatedFields);
      } else if (title === "Tipos de Transmision") {
        await onEdit(index, updatedFields);
      }

      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return oldRow;
    }
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
          marginBottom: 2,
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
            <Box display="flex" flexDirection="column" gap={1} mt={2}>
              {fields.map((field) =>
                field === "descripcion" ? (
                  <ReactQuill
                    key={field}
                    value={newItem[field] || ""}
                    onChange={(value) => handleFieldChange(field, value)}
                    theme="snow"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#121212",
                      borderRadius: "4px",
                    }}
                  />
                ) : field === "idcarroceria" ? (
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
                      Seleccionar Carrocería
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
                ) : (
                  <TextField
                    key={field}
                    label={field}
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

const VehiculoForm = () => {
  const [marcas, setMarcas] = useState([]);
  const [tiposCombustible, setTiposCombustible] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState([]);
  const [tiposCarroseria, setTiposCarroseria] = useState([]);
  const [tiposTransmision, setTiposTransmision] = useState([]);
  //  ----------------------------------------------------------------
  useEffect(() => {
    async function getMarcas() {
      try {
        const response = await api.get("/marcas");

        const { data } = response.data;

        setMarcas(data);
      } catch (error) {}
    }

    getMarcas();
  }, []);

  async function handleAddMarca(fields) {
    try {
      const response = await api.post("/marcas", fields);

      const { data } = response.data;
      setMarcas((prev) => [...prev, data]);
      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteMarca(index) {
    try {
      const marca_id = marcas[index]?.id_marca;

      const response = await api.delete(`/marcas/${marca_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditMarca(index, fields) {
    try {
      const marca_id = marcas[index]?.id_marca;

      const response = await api.put(`/marcas/${marca_id}`, fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }
  //  ---------------------Combustible----------------------------------------

  useEffect(() => {
    async function getCombustible() {
      try {
        const response = await api.get("/combustibles/con");

        const { data } = response.data;

        setTiposCombustible(data);
      } catch (error) {}
    }

    getCombustible();
  }, []);

  async function handleAddCombustible(fields) {
    try {
      const response = await api.post("/combustibles", fields);

      const { data } = response.data;
      setTiposCombustible((prev) => [...prev, data]);
      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteCombustible(index) {
    try {
      const combustible_id = tiposCombustible[index]?.idcombustible;

      const response = await api.delete(`/combustibles/${combustible_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditCombustible(index, fields) {
    try {
      const combustible_id = tiposCombustible[index]?.idcombustible;

      const response = await api.put(`/combustibles/${combustible_id}`, fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }
  //  -----------------Vehículo-----------------------------------------------

  useEffect(() => {
    async function getVehiculos() {
      try {
        const response = await api.get("/tipos-vehiculo");
        const { data } = response.data;
        setTiposVehiculo(data);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    }
    getVehiculos();
  }, []);

  async function handleAddVehiculo(fields) {
    try {
      const response = await api.post("/tipos-vehiculo", fields);
      const { data } = response.data;
      setTiposVehiculo((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding vehiculo:", error);
    }
  }

  async function handleEditVehiculo(index, fields) {
    try {
      const vehiculoId = tiposVehiculo[index]?.idtipo_vehiculo;
      const response = await api.put(`/tipos-vehiculo/${vehiculoId}`, fields);
      const { data } = response.data;
      setTiposVehiculo((prev) =>
        prev.map((item, i) => (i === index ? { ...item, ...data } : item))
      );
    } catch (error) {
      console.error("Error editing vehiculo:", error);
    }
  }

  async function handleDeleteVehiculo(index) {
    try {
      const vehiculoId = tiposVehiculo[index]?.idtipo_vehiculo;
      await api.delete(`/tipos-vehiculo/${vehiculoId}`);
      setTiposVehiculo((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting vehiculo:", error);
    }
  }
  //  ------------------------------carroseria -------------------------------------------

  useEffect(() => {
    async function getCarroserias() {
      try {
        const response = await api.get("/carrocerias");
        const { data } = response.data;
        setTiposCarroseria(data);
      } catch (error) {
        console.error("Error fetching carroserias:", error);
      }
    }
    getCarroserias();
  }, []);

  //  ---------------------Transmision----------------------------------------

  useEffect(() => {
    async function getTransmision() {
      try {
        const response = await api.get("/transmisiones");

        const { data } = response.data;

        setTiposTransmision(data);
      } catch (error) {}
    }

    getTransmision();
  }, []);
  async function handleAddTransmision(fields) {
    try {
      const response = await api.post("/transmisiones", fields);
      const { data } = response.data;
      setTiposTransmision((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding vehiculo:", error);
    }
  }

  async function handleEditTransmision(index, fields) {
    try {
      const id_transmision = tiposTransmision[index]?.idtransmision;
      const response = await api.put(
        `/transmisiones/${id_transmision}`,
        fields
      );
      const { data } = response.data;
    } catch (error) {
      console.error("Error editing vehiculo:", error);
    }
  }

  async function handleDeleteTransmision(index) {
    try {
      const id_transmision = tiposTransmision[index]?.idtransmision;

      const response = await api.delete(`/transmisiones/${id_transmision}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.error("Error deleting vehiculo:", error);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        padding: 4,
        color: "#FFFFFF",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={2} sx={{ gap: 1 }} justifyContent="center">
        <Grid item xs={12} md={12}>
          <EditableListt
            title="Marcas"
            items={marcas}
            setItems={setMarcas}
            fields={["marca", "descripcion"]}
            onSubmit={handleAddMarca}
            onDelete={handleDeleteMarca}
            onEdit={handleEditMarca}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditableListt
            title="Tipos de Combustible"
            items={tiposCombustible}
            setItems={setTiposCombustible}
            fields={["tipo_combustible"]}
            onSubmit={handleAddCombustible}
            onDelete={handleDeleteCombustible}
            onEdit={handleEditCombustible}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditableListt
            title="Tipos de Transmision"
            items={tiposTransmision}
            setItems={setTiposTransmision}
            fields={["tipo_transmision"]}
            onSubmit={handleAddTransmision}
            onDelete={handleDeleteTransmision}
            onEdit={handleEditTransmision}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditableListt
            title="Tipos de Carrocería"
            items={tiposCarroseria}
            setItems={setTiposCarroseria}
            fields={["tipo_carroceria"]}
            onSubmit={(fields) => {
              api.post("/carrocerias", fields).then(({ data }) => {
                setTiposCarroseria((prev) => [...prev, data.data]);
              });
            }}
            onDelete={(index) => {
              const id = tiposCarroseria[index]?.idcarroceria;
              api.delete(`/carrocerias/${id}`).then(() => {
                setTiposCarroseria((prev) =>
                  prev.filter((_, i) => i !== index)
                );
              });
            }}
            onEdit={(index, fields) => {
              const id = tiposCarroseria[index]?.idcarroceria;
              api.put(`/carrocerias/${id}`, fields).then(({ data }) => {
                setTiposCarroseria((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, ...fields } : item
                  )
                );
              });
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditableListt
            title="Tipos de Vehículo"
            items={tiposVehiculo}
            setItems={setTiposVehiculo}
            fields={["tipo_vehiculo", "idcarroceria"]}
            relatedData={tiposCarroseria}
            onSubmit={handleAddVehiculo}
            onDelete={handleDeleteVehiculo}
            onEdit={handleEditVehiculo}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehiculoForm;
