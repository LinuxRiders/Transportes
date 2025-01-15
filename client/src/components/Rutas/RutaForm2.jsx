import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import api from "../../api/api";
import EditableList from "../EditableList";

const RutaForm2 = () => {
  const [rutas, setRutas] = useState([]);
  const [rutaLugares, setRutaLugares] = useState([]);
  const [currentRutaId, setCurrentRutaId] = useState(null);
  const [isRutaLocked, setIsRutaLocked] = useState(false);
  // ==================================== Rutas ==========================================================
  useEffect(() => {
    async function getLugaRuta() {
      try {
        const response = await api.get("/rutas");

        const { data } = response.data;

        setRutas(data);
      } catch (error) {}
    }

    getLugaRuta();
  }, []);

  async function handleAddRuta(fields) {
    try {
      const response = await api.post("/rutas", fields);

      const { data } = response.data;
      setRutas((prev) => [...prev, data]);
      if (data) {
        console.log(data);
        setCurrentRutaId(data.id_rutas);
        setIsRutaLocked(true);
      }
    } catch (error) {}
  }

  async function handleDeleteRuta(index) {
    try {
      const Ruta_id = rutas[index]?.id_rutas;

      const response = await api.delete(`/rutas/${Ruta_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditRuta(index, fields) {
    try {
      const Ruta_id = rutas[index]?.id_rutas;

      const response = await api.put(`/rutas/${Ruta_id}`, fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  // ============================Ruta Lugares======================================================
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
      if (!fields.ruta_id && currentRutaId) {
        fields.ruta_id = currentRutaId;
      }

      const response = await api.post("/rutas-lugares", fields);

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

  async function handleEditRutas(index, fields) {
    try {
      const lugares_id = rutaLugares[index]?.id_ruta_lugares;

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!isRutaLocked ? (
              <EditableList
                title="Rutas"
                items={rutas}
                setItems={setRutas}
                fields={["nombre_ruta", "descripcion", "duracion", "precio"]}
                onSubmit={handleAddRuta}
                onDelete={handleDeleteRuta}
                onEdit={handleEditRuta}
              />
            ) : (
              <Box>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Ruta creada con éxito.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsRutaLocked(false);
                    setCurrentRutaId(null);
                    // Opcional: reiniciar otros estados o formularios relacionados si es necesario
                  }}
                >
                  Agregar otra ruta
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <EditableList
              title="Ruta Lugares"
              items={rutaLugares}
              setItems={setRutaLugares}
              fields={["lugar_turistico_id", "orden_visita", "tiempo_estancia"]}
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

export default RutaForm2;
