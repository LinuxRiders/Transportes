import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import api from "../../api/api";
import EditableList from "../EditableList";

const RutaForm2 = () => {
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);
  const [rutas, setRutas] = useState([]);

  //============================Lugares Turisticos================================================

  useEffect(() => {
    async function getLugaTuri() {
      try {
        const response = await api.get("/lugares-turisticos");

        const { data } = response.data;

        setLugaresTuristicos(data);
      } catch (error) {}
    }

    getLugaTuri();
  }, []);

  //==================================== Rutas ==========================================================
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

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteRuta(index) {
    try {
      const Ruta_id = rutas[index]?.idruta;

      const response = await api.delete(`/rutas/${Ruta_id}`);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditRuta(index, fields) {
    try {
      const Ruta_id = rutas[index]?.idruta;

      const response = await api.put(`/rutas/${Ruta_id}`, fields);

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
              title="Rutas"
              items={rutas}
              setItems={setRutas}
              fields={["nombre", "descripcion", "categoria_id"]}
              relatedData={lugaresTuristicos}
              onSubmit={handleAddRuta}
              onDelete={handleDeleteRuta}
              onEdit={handleEditRuta}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RutaForm2;
