import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import api from "../../api/api";
import EditableList from "../EditableList";

const RutaForm3 = () => {
  const [lugaresTuristicos, setLugaresTuristicos] = useState([]);

  //============================Lugares Turisticos================================================

  useEffect(() => {
    async function getLugaTuristico() {
      try {
        const response = await api.get("/lugares-turisticos");

        const { data } = response.data;

        setRutas(data);
      } catch (error) {}
    }

    getLugaTuristico();
  }, []);

  async function handleAddLugaTuristico(fields) {
    try {
      const response = await api.post("/lugares-turisticos", fields);

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleDeleteLugaTuristico(index) {
    try {
      const LugaTuristico_id = lugaresTuristicos[index]?.idruta;

      const response = await api.delete(
        `/lugares-turisticos/${LugaTuristico_id}`
      );

      const { data } = response.data;

      if (data) {
        console.log(data);
      }
    } catch (error) {}
  }

  async function handleEditLugaTuristico(index, fields) {
    try {
      const LugaTuristico_id = lugaresTuristicos[index]?.idruta;

      const response = await api.put(
        `/lugares-turisticos/${LugaTuristico_id}`,
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
              title="Lugares Turísticos"
              items={lugaresTuristicos}
              setItems={setLugaresTuristicos}
              fields={["nombre", "descripcion"]}
              onSubmit={handleAddLugaTuristico}
              onDelete={handleDeleteLugaTuristico}
              onEdit={handleEditLugaTuristico}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RutaForm3;
