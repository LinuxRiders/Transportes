import React, { useState } from "react";
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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // General Car Icon
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import BuildIcon from "@mui/icons-material/Build"; // Mecánica
import SyncIcon from "@mui/icons-material/Sync"; // Semi Automática
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion"; // Variable Continua
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";

const iconOptionsVehiculos = [
  { label: "Carro", icon: <DirectionsCarIcon /> },
  { label: "Motocicleta", icon: <TwoWheelerIcon /> },
  { label: "Camioneta", icon: <AirportShuttleIcon /> },
  { label: "Camión", icon: <LocalShippingIcon /> },
  { label: "Autobús", icon: <BusAlertIcon /> },
];

const iconOptionsTransmisiones = [
  { label: "MEC", icon: <BuildIcon />, description: "Mecánica" },
  { label: "AUT", icon: <DirectionsCarIcon />, description: "Automática" },
  { label: "SAT", icon: <SyncIcon />, description: "Semi Automática" },
  {
    label: "CVT",
    icon: <AutoAwesomeMotionIcon />,
    description: "Variable Continua",
  },
];

const EditableList = ({ title, items, setItems, fields, iconOptions }) => {
  const [newItem, setNewItem] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleFieldChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      setItems((prev) =>
        prev.map((item, index) =>
          index === editIndex ? { ...item, ...newItem } : item
        )
      );
      setEditIndex(null);
    } else {
      setItems((prev) => [...prev, { ...newItem }]);
    }
    setNewItem({});
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    const updatedItems = items.map((item, index) =>
      index + 1 === newRow.id ? { ...item, ...newRow } : item
    );
    setItems(updatedItems);
    return newRow;
  };
  return (
    <>
      <Accordion
        expanded={isAccordionOpen}
        onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        sx={{
          color: "#FFFFFF",
          boxShadow: `0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)`,
          border: `1px solid #F5F5F5`,
          borderRadius: 2,
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
            <List>
              {items.slice(0, 2).map((item, index) => (
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
                        {item.icon && (
                          <Box sx={{ marginRight: 1, color: "black" }}>
                            {item.icon}
                          </Box>
                        )}
                        <Typography sx={{ color: "black", fontWeight: "bold" }}>
                          {item.label || item.name}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      item.description && (
                        <Typography sx={{ color: "#757575" }}>
                          {item.description}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box display="flex" flexDirection="column" gap={1} mt={2}>
              {fields.map((field) =>
                field === "description" ? (
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
                ) : field === "icon" ? (
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
                      Seleccionar ícono
                    </MenuItem>
                    {iconOptions?.map((option, index) => (
                      <MenuItem key={index} value={option.icon}>
                        {option.icon}
                        {option.label}
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
              rows={items.map((item, index) => ({ id: index + 1, ...item }))}
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
  const [marcas, setMarcas] = useState([
    { name: "Toyota", description: "Vehículo confiable y eficiente." },
    { name: "Ford", description: "Conocido por su potencia." },
  ]);
  const [tiposCombustible, setTiposCombustible] = useState([
    { label: "Gasolina" },
    { label: "Diésel" },
  ]);
  const [tiposVehiculo, setTiposVehiculo] = useState([
    { label: "Sedán", icon: <DirectionsCarIcon /> },
    { label: "SUV", icon: <AirportShuttleIcon /> },
  ]);
  const [tiposCarroseria, setTiposCarroseria] = useState([
    { label: "Hatchback" },
    { label: "Convertible" },
  ]);
  const [tiposTransmision, setTiposTransmision] = useState([
    { label: "MEC", icon: <BuildIcon /> },
    { label: "AUT", icon: <DirectionsCarIcon /> },
  ]);

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
        <Grid item xs={12} md={10}>
          <EditableList
            title="Marcas"
            items={marcas}
            setItems={setMarcas}
            fields={["name", "description"]}
            useRichText={true}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <EditableList
            title="Tipos de Combustible"
            items={tiposCombustible}
            setItems={setTiposCombustible}
            fields={["label"]}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <EditableList
            title="Tipos de Vehículo"
            items={tiposVehiculo}
            setItems={setTiposVehiculo}
            fields={["label", "icon"]}
            iconOptions={iconOptionsVehiculos}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <EditableList
            title="Tipos de Carrocería"
            items={tiposCarroseria}
            setItems={setTiposCarroseria}
            fields={["label"]}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <EditableList
            title="Tipos de Transmisión"
            items={tiposTransmision}
            setItems={setTiposTransmision}
            fields={["label", "icon"]}
            iconOptions={iconOptionsTransmisiones}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehiculoForm;
