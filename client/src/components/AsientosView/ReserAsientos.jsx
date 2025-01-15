import React, { useState, useEffect } from "react";
import Matriz from "./matriz";
import Detalles from "./Detalles";
import { Box } from "@mui/material";

const ReserAsientos = () => {
  const [floors, setFloors] = useState([
    {
      rows: 5,
      columns: 4,
      selectedSeats: [
        {
          id: 1,
          row: 1,
          column: "A",
          estado_asiento: "ocupado",
          precio: 70,
          tipo_asiento: "Normal",
          caracteristica: "Ventana",
          created_at: "2025-01-01 12:00:00",
        },
        {
          id: 2,
          row: 1,
          column: "B",
          estado_asiento: "disponible",
          precio: 70,
          tipo_asiento: "VIP",
          caracteristica: "Espacioso",
          created_at: "2025-01-02 14:30:00",
        },
        {
          id: 3,
          row: 2,
          column: "A",
          estado_asiento: "disponible",
          precio: 70,
          tipo_asiento: "Normal",
          caracteristica: "Cerca de la salida",
          created_at: "2025-01-03 16:45:00",
        },
        {
          id: 4,
          row: 2,
          column: "B",
          estado_asiento: "seleccionado",
          precio: 70,
          tipo_asiento: "Premium",
          caracteristica: "Reclinable",
          created_at: "2025-01-04 18:15:00",
        },
      ],
    },
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutos en segundos
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Contador de reserva
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          alert(
            "El tiempo ha expirado, por favor realiza la reserva nuevamente."
          );
          setSelectedSeats([]); // Resetea los asientos seleccionados
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Seleccionar un asiento
  const handleSeatClick = (floorIndex, seat) => {
    if (seat.estado_asiento === "ocupado") return;

    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];
      floor.selectedSeats = floor.selectedSeats.map((s) =>
        s.id === seat.id
          ? {
              ...s,
              estado_asiento:
                s.estado_asiento === "seleccionado"
                  ? "disponible"
                  : "seleccionado",
            }
          : s
      );

      const updatedSelectedSeats = floor.selectedSeats.filter(
        (s) => s.estado_asiento === "seleccionado"
      );
      setSelectedSeats(updatedSelectedSeats);

      return updatedFloors;
    });
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.precio, 0);

  return (
    <Box
      sx={{
        display: "flex",
        p: 4,
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Solo pasar los datos del primer piso */}
      <Matriz floor={floors[0]} handleSeatClick={handleSeatClick} />
      {/* <Detalles
        selectedSeats={selectedSeats}
        timer={timer}
        totalPrice={totalPrice}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        isDialogOpen={isDialogOpen}
      /> */}
    </Box>
  );
};

export default ReserAsientos;
