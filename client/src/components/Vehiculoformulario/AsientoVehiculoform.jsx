import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Box, Typography } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CloseIcon from "@mui/icons-material/Close";

const AsientoVehiculoform = ({ totalAsientos }) => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const calculateMatrix = (totalSeats) => {
      let optimalRows = 1;
      let optimalColumns = totalSeats;

      for (let r = 1; r <= Math.ceil(Math.sqrt(totalSeats)); r++) {
        if (
          totalSeats % r === 0 ||
          Math.ceil(totalSeats / r) * r >= totalSeats
        ) {
          optimalRows = r;
          optimalColumns = Math.ceil(totalSeats / r);
        }
      }

      setRows(optimalRows);
      setColumns(optimalColumns);
    };

    if (totalAsientos > 0) {
      calculateMatrix(totalAsientos);
    }
  }, [totalAsientos]);

  useEffect(() => {
    const initializeMatrix = () => {
      const newMatrix = Array.from({ length: rows }, () =>
        Array(columns).fill(null)
      );

      let seatIndex = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (seatIndex <= totalAsientos) {
            newMatrix[i][j] = seatIndex++;
          }
        }
      }

      setMatrix(newMatrix);
    };

    if (rows > 0 && columns > 0) {
      initializeMatrix();
    }
  }, [rows, columns]);

  useEffect(() => {
    const formatData = () => {
      const columnLabels = generateColumnLabels(columns);
      const formatted = [];

      matrix.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
          if (selectedSeats.includes(seat)) {
            formatted.push({
              row: rowIndex + 1,
              column: columnLabels[colIndex],
            });
          }
        });
      });

      setFormattedData(formatted);
    };

    formatData();
  }, [matrix, selectedSeats]);

  const handleRowsChange = (e) => {
    const newRows = Number(e.target.value);
    if (newRows * columns >= totalAsientos) {
      setRows(newRows);
      setError("");
    } else {
      setError(
        `La matriz debe ser suficientemente grande para ${totalAsientos} asientos.`
      );
    }
  };

  const handleColumnsChange = (e) => {
    const newColumns = Number(e.target.value);
    if (rows * newColumns >= totalAsientos) {
      setColumns(newColumns);
      setError("");
    } else {
      setError(
        `La matriz debe ser suficientemente grande para ${totalAsientos} asientos.`
      );
    }
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handleDragStart = (event, seat) => {
    event.dataTransfer.setData("seat", seat);
  };

  const handleDrop = (event, targetRow, targetCol) => {
    event.preventDefault();
    const draggedSeat = parseInt(event.dataTransfer.getData("seat"), 10);

    if (matrix[targetRow][targetCol] !== null) {
      return;
    }

    const newMatrix = matrix.map((row) => [...row]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (newMatrix[i][j] === draggedSeat) {
          newMatrix[i][j] = null;
        }
      }
    }

    newMatrix[targetRow][targetCol] = draggedSeat;
    setMatrix(newMatrix);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const generateColumnLabels = (num) => {
    return Array.from({ length: num }, (_, i) => String.fromCharCode(65 + i));
  };

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
        Registro de asientos
      </Typography>
      <Typography sx={{ mb: 2 }}>Total de asientos: {totalAsientos}</Typography>

      {/* Inputs para tamaño de matriz */}
      <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Rows"
          type="number"
          value={rows}
          onChange={handleRowsChange}
          inputProps={{ min: 1 }}
          size="small"
        />
        <TextField
          label="Columns"
          type="number"
          value={columns}
          onChange={handleColumnsChange}
          inputProps={{ min: 1 }}
          size="small"
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {/* Representación de la matriz */}
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={1} sx={{ m: 2 }}></Grid>
          {generateColumnLabels(columns).map((label) => (
            <Grid item xs={1} key={label} sx={{ m: 2 }}>
              <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
                {label}
              </Box>
            </Grid>
          ))}
        </Grid>

        {matrix.map((row, rowIndex) => (
          <Grid container spacing={0} key={rowIndex}>
            <Grid item xs={1} sx={{ m: 2 }}>
              <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
                {rowIndex + 1}
              </Box>
            </Grid>
            {row.map((seat, colIndex) => (
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
                onDrop={(event) => handleDrop(event, rowIndex, colIndex)}
              >
                {seat ? (
                  <Button
                    fullWidth
                    draggable
                    onDragStart={(event) => handleDragStart(event, seat)}
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      height: 40,
                      boxShadow: selectedSeats.includes(seat)
                        ? "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)"
                        : " ",
                      background: selectedSeats.includes(seat)
                        ? ""
                        : "rgba(187, 187, 187, 0.3)",
                      borderBottom: selectedSeats.includes(seat)
                        ? "2px solid orange"
                        : "2px solid red",
                      color: selectedSeats.includes(seat) ? "orange" : "red",
                    }}
                  >
                    {selectedSeats.includes(seat) ? (
                      <EventSeatIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Button>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background: "rgba(187, 187, 187, 0.3)",
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default AsientoVehiculoform;
