import React, { useState, useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Tooltip,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import api from "../../api/api";

/** DropdownField genérico */
const DropdownField = ({
  label,
  name,
  value,
  options,
  onChange,
  icon: Icon,
}) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      color: "#FF6F00",
      borderRadius: 2,
    }}
  >
    <Typography
      variant="h7"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      {Icon && <Icon />} {label}
    </Typography>
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        sx={{ background: "transparent" }}
      >
        <MenuItem value="" disabled>
          Seleccionar {label}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

const getSeatSX = (estado) => {
  switch (estado) {
    case "disponible":
      return {
        backgroundColor: "#FFDD99",
        color: "#FF6F00",
        border: "2px solid #FF6F00",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "#FFDD99",
          color: "#FFFFFF",
        },
      };
    case "ocupado":
      return {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "#757575",
        },
      };
    case "seleccionado":
      return {
        backgroundColor: "#FF7043",
        color: "#FFFFFF",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "#FF5722",
        },
      };
    default:
      return {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        borderRadius: "50%",
        "&:hover": {
          opacity: 0.9,
        },
      };
  }
};

const Matriz = ({ selectedVehiculoId }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [asientos, setAsientos] = useState([]);

  // Para expandir/colapsar la leyenda
  const [showExtraData, setShowExtraData] = useState(false);

  useEffect(() => {
    async function fetchVehiculos() {
      try {
        const response = await api.get("/vehiculos");
        const { data } = response.data;
        setVehiculos(data);
      } catch (error) {
        console.error("Error al obtener la lista de vehiculos:", error);
      }
    }
    fetchVehiculos();
  }, []);

  useEffect(() => {
    if (!selectedVehiculoId) {
      setAsientos([]);
      return;
    }

    async function fetchAsientos() {
      try {
        const response = await api.get(
          `/asientos/vehicle/${selectedVehiculoId}`
        );
        const asientosFromAPI = response.data.data;

        // Forzamos 1A
        let found1A = asientosFromAPI.find(
          (seat) => seat.fila === 1 && seat.columna === "A"
        );
        if (!found1A) {
          found1A = {
            idAsiento: 99999,
            fila: 1,
            columna: "A",
            tipo_asiento: "Especial",
            estado_asiento: "ocupado",
            caracteristica: "Conductor",
          };
          asientosFromAPI.push(found1A);
        } else {
          found1A.estado_asiento = "ocupado";
        }

        setAsientos(asientosFromAPI);
      } catch (error) {
        console.error("Error al buscar asientos:", error);
        setAsientos([]);
      }
    }

    fetchAsientos();
  }, [selectedVehiculoId]);

  // Calcular filas y columnas
  const maxRow = useMemo(() => {
    if (asientos.length === 0) return 0;
    return Math.max(...asientos.map((seat) => seat.fila));
  }, [asientos]);

  const maxColNumber = useMemo(() => {
    if (asientos.length === 0) return 0;
    return Math.max(...asientos.map((seat) => seat.columna.charCodeAt(0) - 65));
  }, [asientos]);

  const generateColumnLabels = (maxCol) => {
    const labels = [];
    for (let i = 0; i <= maxCol; i++) {
      labels.push(String.fromCharCode(65 + i));
    }
    return labels;
  };
  const columnLabels = generateColumnLabels(maxColNumber);

  const renderSeatTooltip = (seat) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography variant="body2">
        <strong>Asiento:</strong> Fila {seat.fila}, Col {seat.columna}
      </Typography>
      <Typography variant="body2">
        <strong>Tipo:</strong> {seat.tipo_asiento || "N/A"}
      </Typography>
      <Typography variant="body2">
        <strong>Estado:</strong> {seat.estado_asiento}
      </Typography>
      {seat.caracteristica && (
        <Typography variant="body2">
          <strong>Características:</strong> {seat.caracteristica}
        </Typography>
      )}
    </Box>
  );

  const handleSeatClick = (seat) => {
    console.log("Hiciste clic en asiento:", seat);
  };

  // Para agrandar la matriz
  const containerWidth = (columnLabels.length + 2) * 60;
  const containerHeight = (maxRow + 2) * 60;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 2 }}>
      <Grid container spacing={2}>
        {/* Matriz */}
        <Grid item xs={6}>
          <Paper
            sx={{
              mt: 2,
              p: 3,
              backgroundColor: "transparent",
              border: "1px solid #FF6F00",
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300,
            }}
          >
            {asientos.length === 0 ? (
              <Typography textAlign="center" color="black">
                {selectedVehiculoId
                  ? "Este vehículo no tiene asientos registrados (o se forzó 1A)."
                  : "Selecciona un vehículo para ver sus asientos."}
              </Typography>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  width: containerWidth,
                  height: containerHeight,
                  borderRadius: "60px",
                  border: "4px solid #9E9E9E",
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                {/* Cabecera de columnas */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Box sx={{ width: 40, marginRight: 1 }} />
                  {columnLabels.map((colLabel) => (
                    <Typography
                      key={colLabel}
                      sx={{
                        width: 50,
                        textAlign: "center",
                        color: "#FF6F00",
                        fontWeight: "bold",
                      }}
                    >
                      {colLabel}
                    </Typography>
                  ))}
                </Box>

                {/* Filas */}
                {Array.from({ length: maxRow }, (_, rowIdx) => {
                  const rowNumber = rowIdx + 1;
                  return (
                    <Box
                      key={`row-${rowNumber}`}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      {/* Número de fila */}
                      <Typography
                        sx={{
                          width: 40,
                          textAlign: "center",
                          color: "#FF6F00",
                          fontWeight: "bold",
                          marginRight: 2,
                        }}
                      >
                        {rowNumber}
                      </Typography>

                      {/* Asientos en cada columna */}
                      {columnLabels.map((colLabel) => {
                        const seat = asientos.find(
                          (s) => s.fila === rowNumber && s.columna === colLabel
                        );

                        if (!seat) {
                          // Hueco vacío
                          return (
                            <Box
                              key={`empty-${rowNumber}-${colLabel}`}
                              sx={{
                                width: 50,
                                height: 50,
                                marginRight: 2,
                              }}
                            />
                          );
                        }

                        const is1A = seat.fila === 1 && seat.columna === "A";
                        const IconToUse = is1A
                          ? AirlineSeatReclineNormalIcon
                          : EventSeatIcon;

                        return (
                          <Box
                            key={`seat-${seat.idAsiento}`}
                            sx={{ marginRight: 2 }}
                          >
                            <Tooltip
                              title={renderSeatTooltip(seat)}
                              arrow
                              enterDelay={2000}
                              leaveDelay={200}
                            >
                              <Button
                                onClick={() => handleSeatClick(seat)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 50,
                                  height: 50,
                                  minWidth: 0,
                                  ...getSeatSX(seat.estado_asiento),
                                }}
                              >
                                <IconToUse
                                  sx={{
                                    fontSize: is1A ? "25px" : "30px",
                                    color: "#FF6F00",
                                  }}
                                />
                              </Button>
                            </Tooltip>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Matriz;
