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
                field === "ruta_id" ? (
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
                ) : field === "duracion" ? (
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
                ) : field === "precio" ? (
                  <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newItem[field] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
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

export default EditableList;
