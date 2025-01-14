import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";

const Detalles = ({
  selectedSeats,
  timer,
  totalPrice,
  handleOpenDialog,
  handleCloseDialog,
  isDialogOpen,
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box
      elevation={3}
      sx={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 4,
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "100%",
        maxHeight: "650px", // Limita la altura máxima del cuadro
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // Permite scroll vertical
          maxHeight: "100%", // Máxima altura disponible
        }}
      >
        {/* Temporizador */}
        <Typography
          sx={{
            mt: 2,
            color: "#FF6F00",
            fontWeight: "bold",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          ⏳ Tiempo restante: {formatTime(timer)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Detalles del Pago */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            mb: 2,
          }}
        >
          Detalles del Pago
        </Typography>

        {selectedSeats.length > 0 ? (
          selectedSeats.map((seat) => (
            <Box
              key={seat.id}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: "#F9F9F9",
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography>
                <strong>Asiento:</strong> {seat.row}
                {seat.column}
              </Typography>
              <Typography>
                <strong>Precio:</strong> S/ {seat.precio.toFixed(2)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", color: "#666" }}>
            No hay asientos seleccionados
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#FF6F00",
            textAlign: "center",
          }}
        >
          Total: S/ {totalPrice.toFixed(2)}
        </Typography>

        {/* Detalles del Viaje */}
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Detalles del Viaje
        </Typography>

        <Box
          sx={{
            backgroundColor: "#F9F9F9",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography>
            <strong>Ruta:</strong> Lima - Ica
          </Typography>
          <Typography>
            <strong>Inicio:</strong> 15 Ene 2025, 01:15 AM
          </Typography>
          <Typography>
            <strong>Llegada:</strong> 15 Ene 2025, 06:15 AM
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#FF6F00",
            "&:hover": { backgroundColor: "#FF8F00" },
            textTransform: "none",
            width: "100%",
          }}
          onClick={handleOpenDialog}
        >
          Más Detalles
        </Button>

        {/* Modal para más detalles */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm">
          <DialogTitle sx={{ backgroundColor: "#FF6F00", color: "#FFFFFF" }}>
            Detalles del Viaje
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <Typography sx={{ mb: 1 }}>
              <strong>Ruta:</strong> Lima - Ica
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Inicio:</strong> 15 Ene 2025, 01:15 AM
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>Llegada:</strong> 15 Ene 2025, 06:15 AM
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Asientos Seleccionados
            </Typography>
            {selectedSeats.map((seat) => (
              <Box
                key={seat.id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: "#F9F9F9",
                  borderRadius: 2,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography>
                  <strong>Asiento:</strong> {seat.row}
                  {seat.column}
                </Typography>
                <Typography>
                  <strong>Tipo:</strong> {seat.tipo_asiento}
                </Typography>
                <Typography>
                  <strong>Características:</strong> {seat.caracteristica}
                </Typography>
                <Typography>
                  <strong>Precio:</strong> S/ {seat.precio.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                textTransform: "none",
                backgroundColor: "#FF6F00",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#FF8F00" },
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Detalles;
