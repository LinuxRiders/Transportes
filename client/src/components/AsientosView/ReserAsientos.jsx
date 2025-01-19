import React from "react";
import Matriz from "./Matriz";

import { Box } from "@mui/material";

const ReserAsientos = () => {
  // Define el ID del vehículo que deseas pasar
  const selectedVehiculoId = "1"; // Aquí coloca el ID deseado (puede venir de contexto, estado, etc.)

  return (
    <Box
      sx={{
        display: "flex",
        p: 4,
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Pasar el ID del vehículo al componente Matriz */}
      <Matriz selectedVehiculoId={selectedVehiculoId} />
    </Box>
  );
};

export default ReserAsientos;
