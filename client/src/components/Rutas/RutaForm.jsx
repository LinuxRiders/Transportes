import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
} from "@mui/material";

// Íconos para Editar/Eliminar
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";
import CategoriasEditor from "./CategoriasEditor";
import { DataGrid } from "@mui/x-data-grid";
import Tablarutas from "./Tablarutas";

function RutaForm() {
  // ------------------------------------------------
  // ESTADOS PRINCIPALES
  // ------------------------------------------------
  const [ruta, setRuta] = useState([]);
  const [rutas, setRutas] = useState([]); // Lista de todas las rutas en BD
  const [currentRutaId, setCurrentRutaId] = useState(null);
  const [isRutaLocked, setIsRutaLocked] = useState(false);
  const [tempPlaceId, setTempPlaceId] = useState(null);
  // LUGAR TURÍSTICO (dentro del modal)
  const [lugarTuristico, setLugarTuristico] = useState([]);
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);

  // RUTA_LUGARES (relación)
  const [rutaLugarData, setRutaLugarData] = useState([]);
  const [rutaLugares, setRutaLugares] = useState([]);

  // CATEGORÍAS
  const [categoriasLugares, setCategoriasLugares] = useState([]);
  const [newCategory, setNewCategory] = useState([]);

  // MODALES
  const [openModalLugares, setOpenModalLugares] = useState(false);
  const [openModalCategoria, setOpenModalCategoria] = useState(false);

  // LISTA LOCAL DEL MODAL
  const [lugaresList, setLugaresList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // ------------------------------------------------
  // 1) CARGA INICIAL DE DATOS
  // ------------------------------------------------
  async function handleEditLugaTuristicoInDB(id, fields) {
    try {
      const response = await api.put(`/lugares-turisticos/${id}`, fields);
      const { data } = response.data; // data actualizado
      return data;
    } catch (error) {
      console.error("Error al editar lugar turístico en la BD:", error);
      return null;
    }
  }

  async function handleEditRutaLugaresInDB(id, fields) {
    try {
      const response = await api.put(`/rutas-lugares/${id}`, fields);
      const { data } = response.data; // data actualizado
      return data;
    } catch (error) {
      console.error(
        "Error al editar la relación ruta_lugares en la BD:",
        error
      );
      return null;
    }
  }

  useEffect(() => {
    async function getLugaTuristico() {
      try {
        const response = await api.get("/lugares-turisticos");
        const { data } = response.data;
        setLugaresTuristicos(data);
        console.log("se consiguio r lugar");
      } catch (error) {
        console.error("Error al cargar lugares:", error);
        console.log("no se puede optener rutass");
      }
    }
    getLugaTuristico();

    async function getRutaLugares() {
      try {
        const response = await api.get("/rutas-lugares");
        const { data } = response.data;
        setRutaLugares(data);
      } catch (error) {
        console.error("Error al cargar ruta_lugares:", error);
      }
    }
    getRutaLugares();

    async function getCategorias() {
      try {
        const response = await api.get("/categorias-lugares");
        const { data } = response.data;
        setCategoriasLugares(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    }
    getCategorias();
  }, []);
  async function handleDeleteLugaTuristico(index) {
    try {
      const LugaTuristico_id = lugaresTuristicos[index]?.id_lugares_turisticos;

      const response = await api.delete(
        `/lugares-turisticos/${LugaTuristico_id}`
      );
      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }
  async function handleDeleteRutas(index) {
    try {
      const lugares_id = rutaLugares[index]?.id_ruta_lugares;

      const response = await api.delete(`/rutas-lugares/${lugares_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }
  // ------------------------------------------------
  // 2) MANEJADORES DE CAMBIO
  // ------------------------------------------------
  const handleChangeRuta = (e) => {
    const { name, value } = e.target;
    setRuta({ ...ruta, [name]: value });
  };
  const handleChangeLugarTuristico = (e) => {
    const { name, value } = e.target;
    setLugarTuristico({ ...lugarTuristico, [name]: value });
  };
  const handleChangeRutaLugar = (e) => {
    const { name, value } = e.target;
    setRutaLugarData({ ...rutaLugarData, [name]: value });
  };
  const handleChangeNewCategory = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // ------------------------------------------------
  // 3) FUNCIONES PARA RUTAS
  // ------------------------------------------------
  async function handleAddRuta() {
    try {
      const response = await api.post("/rutas", ruta);
      const { data } = response.data;
      setRutas((prev) => [...prev, data]);

      if (data) {
        console.log("Ruta creada:", data);
        setCurrentRutaId(data.id_rutas);
        setIsRutaLocked(true);
        alert("Ruta creada. ID: " + data.id_rutas);
      }
    } catch (error) {
      console.error("Error al crear ruta:", error);
    }
  }

  // ------------------------------------------------
  // 4) FUNCIONES PARA LUGARES TURÍSTICOS
  // ------------------------------------------------
  async function handleAddLugaTuristico(fields) {
    try {
      if (fields.id_categoria_lugares) {
        fields.categoria_id = fields.id_categoria_lugares;
        delete fields.id_categoria_lugares;
      }
      const response = await api.post("/lugares-turisticos", fields);
      const { data } = response.data;
      setLugaresTuristicos((prev) => [...prev, data]);
      console.log("Lugar Turístico creado:", data);
      return data; // devolvemos el objeto creado
    } catch (error) {
      console.error("Error al crear lugar turístico:", error);
    }
  }

  // ------------------------------------------------
  // 5) FUNCIONES PARA RUTA_LUGARES
  // ------------------------------------------------
  async function handleAddRutaLugares(fields) {
    try {
      // Asignar ruta_id si no viene en fields
      if (!fields.ruta_id && currentRutaId) {
        fields.ruta_id = currentRutaId;
      }
      if (fields.id_lugares_turisticos) {
        fields.lugar_turistico_id = fields.id_lugares_turisticos;
        delete fields.id_lugares_turisticos;
      }
      const response = await api.post("/rutas-lugares", fields);
      const { data } = response.data;
      setRutaLugares((prev) => [...prev, data]);
      console.log("Relación creada:", data);
      return data;
    } catch (error) {
      console.error("Error al crear ruta_lugares:", error);
    }
  }
  function validateLugarTuristico(lugar) {
    // Retorna true si todo OK, false si faltan campos
    if (!lugar.nombre || !lugar.descripcion || !lugar.ubicacion) {
      return false;
    }
    // Si necesitas chequear la categoría, p.ej.:
    if (!lugar.id_categoria_lugares || lugar.id_categoria_lugares === "") {
      return false;
    }
    return true;
  }

  function validateRutaLugar(rutaLugarData) {
    if (!rutaLugarData.orden_visita || !rutaLugarData.tiempo_estancia) {
      return false;
    }
    return true;
  }

  // ------------------------------------------------
  // 6) FUNCIONES PARA CATEGORÍAS
  // ------------------------------------------------
  async function handleAddNewCategory() {
    try {
      const response = await api.post("/categorias-lugares", newCategory);
      const { data } = response.data;
      setCategoriasLugares((prev) => [...prev, data]);

      // Asignar la nueva categoría a lugarTuristico
      setLugarTuristico((prev) => ({
        ...prev,
        id_categoria_lugares: data.id_categoria_lugares.toString(),
      }));
      console.log("Categoría creada:", data);
      setNewCategory({ nombre_categoria: "", descripcion: "" });
      setOpenModalCategoria(false);
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  }

  // ------------------------------------------------
  // 7) SUBMIT PRINCIPAL
  // ------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (!isRutaLocked) {
      handleAddRuta();
    } else {
      alert("Esta ruta ya se creó. Puedes crear otra o añadir lugares.");
    }
  }

  // ------------------------------------------------
  // 8) MANEJO DE LUGARES (MODAL)
  // ------------------------------------------------
  const handleOpenModalLugares = () => {
    if (!currentRutaId) {
      alert("Primero debes crear la ruta.");
      return;
    }
    setOpenModalLugares(true);
  };

  const handleCloseModalLugares = () => {
    resetPlaceForm();
    setOpenModalLugares(false);
  };

  async function handleSaveLugar() {
    // 1) Revisar que haya una ruta creada
    if (!currentRutaId) {
      alert("No hay Ruta creada todavía.");
      return;
    }

    // 2) Validar campos
    if (
      !validateLugarTuristico(lugarTuristico) ||
      !validateRutaLugar(rutaLugarData)
    ) {
      alert("Campos incompletos o inválidos.");
      return;
    }

    // MODO EDICIÓN: si editingIndex !== null
    if (editingIndex !== null) {
      // -----------
      // EDICIÓN
      // -----------
      // 1) Obtenemos el item de la lista local
      const currentItem = lugaresList[editingIndex];
      const placeId = currentItem.lugarTuristico.id_lugares_turisticos;
      const routeLugarId = currentItem.rutaLugar.id_ruta_lugares;

      // 2) Construir los campos para editar LUGAR TURÍSTICO
      const updatedPlaceFields = { ...lugarTuristico };
      // Manejar la categoría si tu backend la espera como "categoria_id"
      if (updatedPlaceFields.id_categoria_lugares) {
        updatedPlaceFields.categoria_id =
          updatedPlaceFields.id_categoria_lugares;
        delete updatedPlaceFields.id_categoria_lugares;
      }

      // 3) Construir los campos para editar RUTA_LUGARES
      const updatedRutaLugarFields = {
        orden_visita: rutaLugarData.orden_visita,
        tiempo_estancia: rutaLugarData.tiempo_estancia,
      };

      try {
        // A) Actualizamos primero el lugar en la BD
        const updatedPlace = await handleEditLugaTuristicoInDB(
          placeId,
          updatedPlaceFields
        );
        if (!updatedPlace) {
          alert("No se pudo editar el Lugar Turístico. Operación abortada.");
          return;
        }

        // B) Luego actualizamos la relación en la BD
        const updatedRouteLugar = await handleEditRutaLugaresInDB(
          routeLugarId,
          updatedRutaLugarFields
        );
        if (!updatedRouteLugar) {
          alert(
            "No se pudo editar la Relación Ruta_Lugares. Operación abortada."
          );
          // OPCIONAL: revertir el PUT del lugar si lo deseas
          return;
        }

        // C) Actualizamos la lista local (lugaresList) para reflejar los cambios
        const updatedItem = {
          lugarTuristico: { ...currentItem.lugarTuristico, ...updatedPlace },
          rutaLugar: { ...currentItem.rutaLugar, ...updatedRouteLugar },
        };
        const updatedList = [...lugaresList];
        updatedList[editingIndex] = updatedItem;
        setLugaresList(updatedList);

        // D) Salir del modo edición
        resetPlaceForm();
        setEditingIndex(null);
        alert("¡Lugar y Relación editados con éxito!");
      } catch (error) {
        alert("Error en la actualización. Revisa la consola.");
        console.error(error);
        // PODRÍAS HACER REVERT SI LO DESEAS
      }
    } else {
      // -----------
      // CREACIÓN
      // -----------
      // VERIFICAMOS si ya creamos el LUGAR en un intento anterior (tempPlaceId)
      let placeId;
      if (tempPlaceId) {
        // Ya se creó el lugar en un intento previo
        placeId = tempPlaceId;
        console.log("Reutilizando el lugar con ID:", placeId);
      } else {
        // Creamos un nuevo lugar con POST
        try {
          const newPlace = await handleAddLugaTuristico(lugarTuristico);
          if (!newPlace) {
            alert("No se pudo crear el Lugar. Operación abortada.");
            return;
          }
          placeId = newPlace.id_lugares_turisticos;
          setTempPlaceId(placeId);
          console.log("Lugar Turístico creado con ID:", placeId);
        } catch (error) {
          alert("Error al crear el Lugar Turístico. Revisa la consola.");
          console.error(error);
          return;
        }
      }

      // 2) Crear la relación con la ruta
      const fieldsRL = {
        ruta_id: currentRutaId,
        id_lugares_turisticos: placeId,
        orden_visita: rutaLugarData.orden_visita,
        tiempo_estancia: rutaLugarData.tiempo_estancia,
      };

      try {
        const newRelation = await handleAddRutaLugares(fieldsRL);
        if (!newRelation) {
          alert("No se pudo crear la Relación. Revisa datos o conexión.");
          return;
        }
        // ¡Creación exitosa!
        const combinedData = {
          lugarTuristico: {
            ...lugarTuristico,
            id_lugares_turisticos: placeId,
          },
          rutaLugar: newRelation,
        };
        setLugaresList((prev) => [...prev, combinedData]);

        // Limpia todo
        resetPlaceForm();
        setTempPlaceId(null);
        alert("¡Lugar + Relación creados con éxito!");
      } catch (error) {
        alert("Error al crear la Relación. Revisa la consola.");
        console.error(error);
        // No se borra el lugar; en el siguiente intento se reusa placeId
        // a menos que quieras forzar el rollback
      }
    }
  }

  // ------------------------------------------------
  // 9) RESETEAR FORMULARIO DEL MODAL
  // ------------------------------------------------
  const resetPlaceForm = () => {
    setLugarTuristico({
      nombre: "",
      descripcion: "",
      ubicacion: "",
      id_categoria_lugares: "",
    });
    setRutaLugarData({
      orden_visita: "",
      tiempo_estancia: "",
    });
    setEditingIndex(null);
  };

  const handleEditLugar = (index) => {
    const item = lugaresList[index];
    setLugarTuristico({
      ...item.lugarTuristico,
      id_categoria_lugares: item.lugarTuristico.categoria_id || "",
    });
    setRutaLugarData({
      orden_visita: item.rutaLugar.orden_visita,
      tiempo_estancia: item.rutaLugar.tiempo_estancia,
    });
    setEditingIndex(index);
  };

  const handleDeleteLugar = (index) => {
    const updatedList = lugaresList.filter((_, i) => i !== index);
    setLugaresList(updatedList);
    if (editingIndex === index) resetPlaceForm();

    handleDeleteLugaTuristico(index);
    handleDeleteRutas(index);
  };

  // ------------------------------------------------
  // 10) RESETEAR TODO PARA CREAR OTRA RUTA
  // ------------------------------------------------
  function resetAllStates() {
    // Este método limpia TODO y te deja listo para crear una ruta nueva:
    setRuta({
      nombre_ruta: "",
      descripcion: "",
      duracion: "",
      precio: "",
    });
    setIsRutaLocked(false);
    setCurrentRutaId(null);

    // Opcionalmente, limpiar también la lista local de lugares del modal:
    setLugaresList([]);
    resetPlaceForm(); // Limpia el form de lugar y rutaLugar
  }

  // ------------------------------------------------
  // VALIDACIÓN DEL BOTÓN DE CREAR RUTA
  // ------------------------------------------------
  const isRutaValid =
    ruta.nombre_ruta?.trim() !== "" && Number(ruta.precio) > 0;

  // ------------------------------------------------
  // CAMPOS DE LA RUTA
  // ------------------------------------------------
  const rutaFields = [
    { label: "Nombre de la Ruta", name: "nombre_ruta" },
    {
      label: "Descripción de la Ruta",
      name: "descripcion",
    },
    { label: "Duración", name: "duracion", type: "number" },
    { label: "Precio", name: "precio", type: "number" },
  ];

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------
  return (
    <Box
      sx={{
        width: "70%",
        margin: "0 auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(68, 41, 5, 0.2)",

        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Typography gutterBottom sx={{ fontSize: "30px", color: "#FF6F00" }}>
        Formulario de Ruta
      </Typography>

      {/* FORM RUTA */}
      <Box component="form" onSubmit={handleSubmit}>
        {rutaFields.map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            variant="outlined"
            name={field.name}
            type={field.type || "text"}
            value={ruta[field.name]}
            onChange={handleChangeRuta}
            fullWidth
            required={field.name === "nombre_ruta" || field.name === "precio"}
            margin="normal"
            disabled={isRutaLocked} // Bloquear si la ruta ya está creada
          />
        ))}

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          {/* CREAR RUTA */}
          <Button
            variant="contained"
            sx={{ background: "#FF6F00" }}
            type="submit"
            disabled={!isRutaValid || isRutaLocked}
          >
            {isRutaLocked ? "Ruta Creada" : "Crear Ruta"}
          </Button>

          {/* AGREGAR LUGARES (sólo si ya hay una ruta creada) */}
          <Button
            variant="contained"
            onClick={handleOpenModalLugares}
            disabled={!currentRutaId}
            sx={{ background: "#FF6F00" }}
          >
            Agregar Lugares
          </Button>

          {/* BOTÓN PARA COMENZAR OTRA RUTA DESDE CERO */}
          <Button variant="outlined" color="warning" onClick={resetAllStates}>
            Nueva Ruta
          </Button>
        </Box>
      </Box>

      {/* MODAL LUGARES */}
      <Dialog
        open={openModalLugares}
        onClose={handleCloseModalLugares}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Agregar Lugar Turístico</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Datos del Lugar
          </Typography>

          {/* CAMPOS LUGAR TURÍSTICO */}
          <TextField
            label="Nombre del Lugar"
            variant="outlined"
            name="nombre"
            value={lugarTuristico.nombre}
            onChange={handleChangeLugarTuristico}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            variant="outlined"
            name="descripcion"
            value={lugarTuristico.descripcion}
            onChange={handleChangeLugarTuristico}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ubicación"
            variant="outlined"
            name="ubicacion"
            value={lugarTuristico.ubicacion}
            onChange={handleChangeLugarTuristico}
            fullWidth
            margin="normal"
          />

          {/* SELECT DE CATEGORÍA */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              label="Categoría"
              name="id_categoria_lugares"
              value={lugarTuristico.id_categoria_lugares}
              onChange={handleChangeLugarTuristico}
            >
              <MenuItem value="">Seleccione...</MenuItem>
              {categoriasLugares.map((cat) => (
                <MenuItem
                  key={cat.id_categoria_lugares}
                  value={cat.id_categoria_lugares.toString()}
                >
                  {cat.nombre_categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenModalCategoria(true)}
            >
              Nueva Categoría
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* CAMPOS RUTA_LUGARES */}
          <Typography variant="h6" gutterBottom>
            Relación Ruta_Lugares
          </Typography>
          <TextField
            label="Orden de Visita"
            variant="outlined"
            name="orden_visita"
            value={rutaLugarData.orden_visita}
            onChange={handleChangeRutaLugar}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tiempo de Estancia"
            variant="outlined"
            name="tiempo_estancia"
            value={rutaLugarData.tiempo_estancia}
            onChange={handleChangeRutaLugar}
            fullWidth
            margin="normal"
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveLugar}
            >
              {editingIndex !== null ? "Actualizar Lugar" : "Guardar Lugar"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* LISTA LOCAL DE LUGARES AGREGADOS */}
          <Typography variant="h6" gutterBottom>
            Lugares Agregados a esta Ruta
          </Typography>
          {lugaresList.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No hay lugares agregados todavía.
            </Typography>
          ) : (
            lugaresList.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 1,
                  mb: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {item.lugarTuristico.nombre} (ID lugar:{" "}
                    {item.lugarTuristico.id_lugares_turisticos})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Orden de Visita: {item.rutaLugar.orden_visita} | Tiempo de
                    Estancia: {item.rutaLugar.tiempo_estancia}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditLugar(idx)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteLugar(idx)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalLugares} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL PARA NUEVA CATEGORÍA */}
      <Dialog
        open={openModalCategoria}
        onClose={() => setOpenModalCategoria(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Nueva Categoría</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Nombre de la Categoría"
            variant="outlined"
            name="nombre_categoria"
            value={newCategory.nombre_categoria}
            onChange={handleChangeNewCategory}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            variant="outlined"
            name="descripcion"
            value={newCategory.descripcion}
            onChange={handleChangeNewCategory}
            multiline
            rows={2}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Button
              onClick={() => setOpenModalCategoria(false)}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddNewCategory}
              variant="contained"
              color="primary"
            >
              Guardar Categoría
            </Button>
          </Box>
          <Box sx={{ overflowY: "auto", height: "250px" }}>
            <CategoriasEditor />
          </Box>
        </DialogActions>
      </Dialog>
      <Tablarutas></Tablarutas>
    </Box>
  );
}

export default RutaForm;
