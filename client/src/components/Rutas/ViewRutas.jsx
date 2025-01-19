import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Map, Marker, Overlay } from "pigeon-maps";
import api from "../../api/api";
// import api from "../../api/api";  // Uncomment when connected to your API

const ViewRutas = ({ routeId }) => {
  const [route, setRoute] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLugar, setSelectedLugar] = useState(null); // Estado para el lugar seleccionado

  useEffect(() => {
    async function fetchData() {
      try {
        const viajesData = [
          {
            id_viaje: 101,
            estado: "Programado",
            fecha_inicio: "2025-05-01T08:00:00",
            fecha_fin: "2025-05-01T11:00:00",
          },
          {
            id_viaje: 102,
            estado: "En Curso",
            fecha_inicio: "2025-05-02T09:00:00",
            fecha_fin: "2025-05-02T12:00:00",
          },
        ];

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 1000));

        setViajes(viajesData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos de la ruta.");
        setLoading(false);
      }
    }

    fetchData();
  }, [routeId]);

  useEffect(() => {
    async function fetchRutas() {
      try {
        const response = await api.get("/rutas");
        const { data } = response.data;
        setRoute(data); // Actualiza el estado con el arreglo de rutas reales
      } catch (error) {
        console.error("Error al cargar rutas:", error);
        // Opcional: establecer rutas simuladas en caso de error
      }
    }

    fetchRutas();
  }, []);
  useEffect(() => {
    async function fetchRutasLugares() {
      try {
        const response = await api.get("/lugares-turisticos");
        const { data } = response.data;
        setLugares(data); // Actualiza el estado con el arreglo de rutas reales
      } catch (error) {
        console.error("Error al cargar rutas:", error);
        // Opcional: establecer rutas simuladas en caso de error
      }
    }

    fetchRutasLugares();
  }, []);

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!route)
    return <Typography>No se encontraron datos para la ruta.</Typography>;

  const parseCoordinates = (ubicacion) => {
    if (!ubicacion) return null;
    const [lat, lng] = ubicacion.split(",").map(Number);
    return isNaN(lat) || isNaN(lng) ? null : [lat, lng];
  };

  // Extraer coordenadas válidas de los lugares turísticos
  const routeCoordinates = lugares
    .map((lugar) => parseCoordinates(lugar.ubicacion))
    .filter((coord) => coord !== null);
  // Calcular el centro del mapa basado en la primera ubicación válida
  const firstCoord = routeCoordinates[0];
  const center = firstCoord || [0, 0];
  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      {/* Información general de la ruta */}
      <Typography variant="h4" gutterBottom>
        {route.nombre_ruta}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {route.descripcion}
      </Typography>
      <Typography variant="body2">
        <strong>Duración:</strong> {route.duracion}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Precio:</strong> ${route.precio}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* Información detallada */}
        <Grid item xs={12} md={6}>
          {/* Lugares turísticos */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Lugares Turísticos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lugares.length ? (
                <List>
                  {lugares.map((lugar) => (
                    <ListItem key={lugar.id_lugares_turisticos}>
                      <ListItemText
                        primary={lugar.nombre}
                        secondary={
                          <>
                            <Typography variant="body2">
                              {lugar.descripcion}
                            </Typography>
                            <Typography variant="caption">
                              Coordenadas: {lugar.ubicacion}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No hay lugares turísticos asociados.</Typography>
              )}
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ my: 2 }} />

          {/* Viajes */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Viajes Disponibles</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {viajes.length ? (
                <List>
                  {viajes.map((viaje) => (
                    <ListItem key={viaje.id_viaje}>
                      <ListItemText
                        primary={`ID: ${viaje.id_viaje}`}
                        secondary={
                          <>
                            <Typography variant="body2">
                              Estado: {viaje.estado}
                            </Typography>
                            <Typography variant="body2">
                              Inicio:{" "}
                              {new Date(viaje.fecha_inicio).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              Fin: {new Date(viaje.fecha_fin).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>
                  No hay viajes programados para esta ruta.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Mapa de Lugares Turísticos
          </Typography>
          <Box
            sx={{
              height: 500,
              border: "2px solid black",
              position: "relative",
            }}
          >
            <Map center={center} zoom={13} width="100%" height="100%">
              {lugares.map((lugar) => {
                const coords = parseCoordinates(lugar.ubicacion);
                return (
                  coords && (
                    <Marker
                      key={lugar.id_lugares_turisticos}
                      anchor={coords}
                      onClick={() => setSelectedLugar(lugar)} // Al hacer clic, guarda el lugar seleccionado
                      onMouseEnter={() => setSelectedLugar(lugar)} // Opcional: mostrar info al pasar el mouse
                      onMouseLeave={() => setSelectedLugar(null)} // Opcional: ocultar info al quitar el mouse
                    />
                  )
                );
              })}
              {routeCoordinates.length > 1 && (
                <Overlay>
                  <svg width="100%" height="100%">
                    <polyline
                      points={routeCoordinates
                        .map(([lat, lng]) => `${lng},${lat}`)
                        .join(" ")} // Combina las coordenadas en un string compatible con SVG
                      stroke="blue"
                      fill="none"
                      strokeWidth="3"
                    />
                  </svg>
                </Overlay>
              )}
            </Map>

            {/* Panel de información superpuesto */}
            {selectedLugar && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  bgcolor: "white",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 3,
                  maxWidth: "90%",
                }}
              >
                <Typography variant="h6">{selectedLugar.nombre}</Typography>
                <Typography variant="body2">
                  {selectedLugar.descripcion}
                </Typography>
                <Typography variant="caption">
                  Coordenadas: {selectedLugar.ubicacion}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewRutas;
