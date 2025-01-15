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

  // Función para agregar un nuevo piso
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

  // Función para cambiar el número de filas de un piso
  const handleRowsChange = (floorIndex, newRows) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;
        // Filtrar asientos que exceden el nuevo número de filas
        const updatedSeats = floor.selectedSeats.filter(
          (seat) => seat.row <= newRows
        );
        return { ...floor, rows: newRows, selectedSeats: updatedSeats };
      })
    );
  };

  // Función para cambiar el número de columnas de un piso
  const handleColumnsChange = (floorIndex, newColumns) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;
        // Filtrar asientos que exceden el nuevo número de columnas
        const updatedSeats = floor.selectedSeats.filter(
          (seat) => seat.column.charCodeAt(0) - 65 < newColumns
        );
        return { ...floor, columns: newColumns, selectedSeats: updatedSeats };
      })
    );
  };

  // Función para manejar el clic en un asiento (agregar o eliminar)
  const handleSeatClick = (floorIndex, seat, rowIndex, colIndex) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;

        const columnLabel = String.fromCharCode(65 + colIndex);
        const existingSeatIndex = floor.selectedSeats.findIndex(
          (s) => s.row === rowIndex + 1 && s.column === columnLabel
        );

        let updatedSeats = [...floor.selectedSeats];

        if (seat) {
          // Eliminar asiento existente
          updatedSeats.splice(existingSeatIndex, 1);
        } else {
          // Agregar nuevo asiento si no existe en la posición
          if (existingSeatIndex === -1) {
            const newSeat = {
              id: Date.now(), // Usar timestamp para ID único
              row: rowIndex + 1,
              column: columnLabel,
              tipo_asiento: "Normal",
              estado_asiento: "Disponible",
              caracteristica: "",
            };
            updatedSeats.push(newSeat);
          }
        }

        return { ...floor, selectedSeats: updatedSeats };
      })
    );
  };

  // Función para manejar la eliminación de una columna
  const handleColumnDelete = (floorIndex, colIndex) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;
        const updatedSeats = floor.selectedSeats.filter(
          (seat) => seat.column.charCodeAt(0) - 65 !== colIndex
        );
        return { ...floor, selectedSeats: updatedSeats };
      })
    );
  };

  // Función para manejar la eliminación de una fila
  const handleRowDelete = (floorIndex, rowIndex) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;
        const updatedSeats = floor.selectedSeats.filter(
          (seat) => seat.row !== rowIndex + 1
        );
        return { ...floor, selectedSeats: updatedSeats };
      })
    );
  };

  // Función para iniciar el arrastre de un asiento
  const handleDragStart = (seat, floorIndex) => {
    setDraggedSeat({ seat, floorIndex });
  };

  // Función para manejar la colocación de un asiento arrastrado
  const handleDrop = (targetFloorIndex, rowIndex, colIndex) => {
    if (!draggedSeat) return;

    const { seat: draggedSeatData, floorIndex: sourceFloorIndex } = draggedSeat;
    const columnLabel = String.fromCharCode(65 + colIndex);
    const targetFloor = floors[targetFloorIndex];

    // Verificar si la posición de destino ya está ocupada
    const isOccupied = targetFloor.selectedSeats.some(
      (s) => s.row === rowIndex + 1 && s.column === columnLabel
    );

    if (isOccupied) {
      alert("La posición de destino ya está ocupada por otro asiento.");
      setDraggedSeat(null);
      return;
    }

    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        // Eliminar asiento de su piso original
        if (idx === sourceFloorIndex) {
          return {
            ...floor,
            selectedSeats: floor.selectedSeats.filter(
              (s) => s.id !== draggedSeatData.id
            ),
          };
        }

        // Agregar asiento al piso de destino
        if (idx === targetFloorIndex) {
          return {
            ...floor,
            selectedSeats: [
              ...floor.selectedSeats,
              {
                ...draggedSeatData,
                row: rowIndex + 1,
                column: columnLabel,
              },
            ],
          };
        }

        return floor;
      })
    );

    setDraggedSeat(null);
  };

  // Función para permitir el arrastre sobre un elemento
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Función para manejar el clic derecho en un asiento (abrir diálogo de edición)
  const handleRightClick = (e, floorIndex, seat) => {
    e.preventDefault(); // Evita el menú contextual por defecto
    if (seat) {
      setEditSeat({ floorIndex, seat });
      setOpenEditDialog(true);
    }
  };

  // Función para guardar los cambios en el asiento editado
  const handleSaveSeatEdit = () => {
    const { floorIndex, seat } = editSeat;
    setFloors((prevFloors) =>
      prevFloors.map((floor, idx) => {
        if (idx !== floorIndex) return floor;

        const updatedSeats = floor.selectedSeats.map((s) =>
          s.id === seat.id ? seat : s
        );

        return { ...floor, selectedSeats: updatedSeats };
      })
    );

    setOpenEditDialog(false);
    setEditSeat(null);
  };

  // Genera etiquetas de columna basadas en el número de columnas
  const generateColumnLabels = (num) =>
    Array.from({ length: num }, (_, i) => String.fromCharCode(65 + i));

  // Actualiza la capacidad total de asientos cada vez que cambia 'floors'
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
        Registro de Asientos - Múltiples Pisos
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
            Piso {floorIndex + 1} - Total de Asientos:{" "}
            {floor.selectedSeats.length}
          </Typography>

          {/* Inputs para tamaño de matriz */}
          <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Filas"
              type="number"
              value={floor.rows}
              onChange={(e) =>
                handleRowsChange(floorIndex, Number(e.target.value))
              }
              inputProps={{ min: 1 }}
              size="small"
            />
            <TextField
              label="Columnas"
              type="number"
              value={floor.columns}
              onChange={(e) =>
                handleColumnsChange(floorIndex, Number(e.target.value))
              }
              inputProps={{ min: 1 }}
              size="small"
            />
          </Box>

          {/* Representación de la matriz de asientos */}
          <Box>
            <Grid container spacing={0}>
              {/* Espacio para las etiquetas de filas */}
              <Grid item xs={1} sx={{ m: 2 }}></Grid>
              {/* Etiquetas de columnas */}
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
                      padding: "5px",
                    }}
                    onClick={() => handleColumnDelete(floorIndex, colIndex)}
                  >
                    {label}
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Filas de asientos */}
            {Array.from({ length: floor.rows }).map((_, rowIndex) => (
              <Grid container spacing={0} key={rowIndex}>
                {/* Etiqueta de fila */}
                <Grid item xs={1} sx={{ m: 2 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      border: "1px solid #FF6F00",
                      borderRadius: "50%",
                      cursor: "pointer",
                      color: "orange",
                      padding: "5px",
                    }}
                    onClick={() => handleRowDelete(floorIndex, rowIndex)}
                  >
                    {rowIndex + 1}
                  </Box>
                </Grid>
                {/* Asientos */}
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

                            borderRadius: "4px",
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
