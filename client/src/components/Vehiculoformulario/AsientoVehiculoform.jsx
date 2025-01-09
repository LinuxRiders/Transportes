import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const AsientoVehiculoform = ({
  floors,
  setFloors,
  onUpdateCapacidadAsientos,
}) => {
  const [editSeat, setEditSeat] = useState(null); // Estado para el asiento a editar
  const [openEditDialog, setOpenEditDialog] = useState(false); // Estado del modal
  const [draggedSeat, setDraggedSeat] = useState(null);

  const handleAddFloor = () => {
    setFloors((prevFloors) => [
      ...prevFloors,
      {
        rows: 3,
        columns: 3,
        selectedSeats: [],
      },
    ]);
  };

  const handleRowsChange = (floorIndex, newRows) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];
      floor.rows = newRows;

      // Eliminar asientos fuera de los límites
      floor.selectedSeats = floor.selectedSeats.filter(
        (seat) => seat.row <= newRows
      );

      return updatedFloors;
    });
  };

  const handleColumnsChange = (floorIndex, newColumns) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];
      floor.columns = newColumns;

      // Eliminar asientos fuera de los límites
      floor.selectedSeats = floor.selectedSeats.filter(
        (seat) => seat.column.charCodeAt(0) - 65 < newColumns
      );

      return updatedFloors;
    });
  };

  const handleSeatClick = (floorIndex, seat, rowIndex, colIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];

      if (seat) {
        // Eliminar asiento
        floor.selectedSeats = floor.selectedSeats.filter(
          (s) =>
            !(
              s.row === rowIndex + 1 &&
              s.column === String.fromCharCode(65 + colIndex)
            )
        );
      } else {
        // Agregar asiento
        const newSeatId =
          Math.max(...floor.selectedSeats.map((s) => s.id), 0) + 1;
        const columnLabel = String.fromCharCode(65 + colIndex);

        const existingSeat = floor.selectedSeats.find(
          (s) => s.row === rowIndex + 1 && s.column === columnLabel
        );
        if (!existingSeat) {
          floor.selectedSeats.push({
            id: newSeatId,
            row: rowIndex + 1,
            column: columnLabel,
            tipo_asiento: "Normal",
            estado_asiento: "Disponible",
            caracteristica: "",
          });
        }
      }

      return updatedFloors;
    });
  };

  const handleColumnDelete = (floorIndex, colIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];

      floor.selectedSeats = floor.selectedSeats.filter(
        (seat) => seat.column.charCodeAt(0) - 65 !== colIndex
      );

      return updatedFloors;
    });
  };

  const handleRowDelete = (floorIndex, rowIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];

      floor.selectedSeats = floor.selectedSeats.filter(
        (seat) => seat.row - 1 !== rowIndex
      );

      return updatedFloors;
    });
  };
  const handleDragStart = (seat, floorIndex) => {
    setDraggedSeat({ seat, floorIndex });
  };

  const handleDrop = (floorIndex, rowIndex, colIndex) => {
    if (!draggedSeat) return;

    const { seat, floorIndex: sourceFloorIndex } = draggedSeat;
    const columnLabel = String.fromCharCode(65 + colIndex);

    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];

      // Eliminar asiento de su posición original
      const sourceFloor = updatedFloors[sourceFloorIndex];
      sourceFloor.selectedSeats = sourceFloor.selectedSeats.filter(
        (s) => s.id !== seat.id
      );

      // Agregar asiento a la nueva posición
      const targetFloor = updatedFloors[floorIndex];
      targetFloor.selectedSeats.push({
        ...seat,
        row: rowIndex + 1,
        column: columnLabel,
      });

      return updatedFloors;
    });

    setDraggedSeat(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRightClick = (e, floorIndex, seat) => {
    e.preventDefault(); // Evita el menú contextual por defecto
    if (seat) {
      setEditSeat({ floorIndex, seat });
      setOpenEditDialog(true);
    }
  };

  const handleSaveSeatEdit = () => {
    const { floorIndex, seat } = editSeat;
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const floor = updatedFloors[floorIndex];

      floor.selectedSeats = floor.selectedSeats.map((s) =>
        s.id === seat.id ? seat : s
      );

      return updatedFloors;
    });

    setOpenEditDialog(false);
    setEditSeat(null);
  };
  const generateColumnLabels = (num) =>
    Array.from({ length: num }, (_, i) => String.fromCharCode(65 + i));

  //=========================link BASE DE DATOS =======================================

  //--------------------------------Coneccion asientos----------------------------------------

  //================================================================

  useEffect(() => {
    const totalAsientos = floors.reduce(
      (acc, floor) => acc + floor.selectedSeats.length,
      0
    );
    onUpdateCapacidadAsientos(totalAsientos); // Pasa la capacidad de asientos al componente principal
  }, [floors, onUpdateCapacidadAsientos]);
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          mb: 4,
          fontSize: "25px",
          borderBottom: "2px solid #FF6F00",
          color: "#FF6F00",
        }}
      >
        Registro de asientos - Múltiples Pisos
      </Typography>

      <Button
        variant="contained"
        onClick={handleAddFloor}
        sx={{ mb: 4, background: "#FF6F00" }}
      >
        Agregar Piso
      </Button>

      {floors.map((floor, floorIndex) => (
        <Box key={floorIndex} sx={{ mb: 6 }}>
          <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FF6F00" }}>
            Piso {floorIndex + 1} - Total de asientos:{" "}
            {floor.selectedSeats.length}
          </Typography>

          {/* Inputs para tamaño de matriz */}
          <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Rows"
              type="number"
              value={floor.rows}
              onChange={(e) =>
                handleRowsChange(floorIndex, Number(e.target.value))
              }
              inputProps={{ min: 1 }}
              size="small"
            />
            <TextField
              label="Columns"
              type="number"
              value={floor.columns}
              onChange={(e) =>
                handleColumnsChange(floorIndex, Number(e.target.value))
              }
              inputProps={{ min: 1 }}
              size="small"
            />
          </Box>

          {/* Representación de la matriz */}
          <Box>
            <Grid container spacing={0}>
              <Grid item xs={1} sx={{ m: 2 }}></Grid>
              {generateColumnLabels(floor.columns).map((label, colIndex) => (
                <Grid item xs={1} key={label} sx={{ m: 2 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                      color: "orange",
                      border: "1px solid #FF6F00",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleColumnDelete(floorIndex, colIndex)}
                  >
                    {label}
                  </Box>
                </Grid>
              ))}
            </Grid>

            {Array.from({ length: floor.rows }).map((_, rowIndex) => (
              <Grid container spacing={0} key={rowIndex}>
                <Grid item xs={1} sx={{ m: 2 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      border: "1px solid #FF6F00",
                      borderRadius: "50%",
                      cursor: "pointer",
                      color: "orange",
                    }}
                    onClick={() => handleRowDelete(floorIndex, rowIndex)}
                  >
                    {rowIndex + 1}
                  </Box>
                </Grid>
                {Array.from({ length: floor.columns }).map((_, colIndex) => {
                  const seat = floor.selectedSeats.find(
                    (s) =>
                      s.row === rowIndex + 1 &&
                      s.column === String.fromCharCode(65 + colIndex)
                  );
                  return (
                    <Grid
                      item
                      xs={1}
                      key={colIndex}
                      sx={{
                        m: 2,
                        justifyContent: "center",
                        display: "flex",
                      }}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(floorIndex, rowIndex, colIndex)}
                    >
                      {seat ? (
                        <Button
                          fullWidth
                          sx={{
                            height: 40,
                            boxShadow:
                              "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
                            borderBottom: "2px solid #FF6F00",
                            color: "#FF6F00",
                          }}
                          draggable
                          onDragStart={() => handleDragStart(seat, floorIndex)}
                          onClick={() =>
                            handleSeatClick(
                              floorIndex,
                              seat,
                              rowIndex,
                              colIndex
                            )
                          }
                          onContextMenu={(e) =>
                            handleRightClick(e, floorIndex, seat)
                          }
                        >
                          <EventSeatIcon />
                        </Button>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(187, 187, 187, 0.3)",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleSeatClick(
                              floorIndex,
                              seat,
                              rowIndex,
                              colIndex
                            )
                          }
                        />
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>
        </Box>
      ))}
      {/* Modal para editar asiento */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Asiento</DialogTitle>
        <DialogContent>
          {editSeat && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Tipo de Asiento"
                value={editSeat.seat.tipo_asiento}
                onChange={(e) =>
                  setEditSeat((prev) => ({
                    ...prev,
                    seat: { ...prev.seat, tipo_asiento: e.target.value },
                  }))
                }
                fullWidth
              />
              <TextField
                label="Estado del Asiento"
                value={editSeat.seat.estado_asiento}
                onChange={(e) =>
                  setEditSeat((prev) => ({
                    ...prev,
                    seat: { ...prev.seat, estado_asiento: e.target.value },
                  }))
                }
                fullWidth
              />
              <TextField
                label="Características"
                value={editSeat.seat.caracteristica}
                onChange={(e) =>
                  setEditSeat((prev) => ({
                    ...prev,
                    seat: { ...prev.seat, caracteristica: e.target.value },
                  }))
                }
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveSeatEdit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AsientoVehiculoform;
