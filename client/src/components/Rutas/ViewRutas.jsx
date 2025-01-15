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
import { Map, Marker } from "pigeon-maps";
// import api from "../../api/api";  // Descomenta y usa cuando conectes a la API

const ViewRutas = ({ routeId }) => {
  const [route, setRoute] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulación de obtención de datos con ejemplo estático.
        const routeData = {
          nombre_ruta: "Ruta Valle sagrado - Pisac",
          descripcion:
            "Una ruta que recorre el hermoso Valle Sagrado de los Incas.",
          duracion: "3 horas",
          precio: "$50",
        };
        const lugaresData = [
          {
            id_lugares_turisticos: 1,
            nombre: "Pisac",
            descripcion: "Ruinas y mercado tradicional.",
            ubicacion: "-13.4157,-71.8250",
          },
          {
            id_lugares_turisticos: 2,
            nombre: "Ollantaytambo",
            descripcion: "Sitio arqueológico impresionante.",
            ubicacion: "-13.2621,-72.2620",
          },
          {
            id_lugares_turisticos: 3,
            nombre: "Cusco",
            descripcion: "Plaza de Armas Cusco",
            ubicacion: "-13.516778518514615, -71.97865075860243",
          },
        ];
        const viajesData = [
          {
            Id_viaje: 101,
            estado: "Programado",
            fecha_inicio: "2025-05-01T08:00:00",
            fecha_fin: "2025-05-01T11:00:00",
          },
          {
            Id_viaje: 102,
            estado: "En Curso",
            fecha_inicio: "2025-05-02T09:00:00",
            fecha_fin: "2025-05-02T12:00:00",
          },
        ];

        // Simula una demora en la carga
        await new Promise((res) => setTimeout(res, 1000));

        setRoute(routeData);
        setLugares(lugaresData);
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

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!route)
    return <Typography>No se encontraron datos para la ruta.</Typography>;

  // Función para parsear coordenadas desde un string "lat,lng"
  const parseCoordinates = (ubicacion) => {
    if (!ubicacion) return null;
    const parts = ubicacion.split(",");
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    return isNaN(lat) || isNaN(lng) ? null : [lat, lng];
  };

  // Calcular el centro del mapa basado en la primera ubicación válida
  const firstCoord = lugares.find((l) =>
    parseCoordinates(l.ubicacion)
  )?.ubicacion;
  const center = firstCoord ? parseCoordinates(firstCoord) : [0, 0];

  return (
    <Box sx={{ padding: 2 }}>
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
        <strong>Precio:</strong> {route.precio}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* Columna izquierda: Información y listas */}
        <Grid item xs={12} md={6} sx={{ overflow: "hidden" }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">
                Lugares Turísticos en la Ruta
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lugares.length > 0 ? (
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
                              Ubicación: {lugar.ubicacion}
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

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">
                Viajes Disponibles para esta Ruta
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {viajes.length > 0 ? (
                <List>
                  {viajes.map((viaje) => (
                    <ListItem key={viaje.Id_viaje}>
                      <ListItemText
                        primary={`Viaje ID: ${viaje.Id_viaje}`}
                        secondary={
                          <>
                            <Typography variant="body2">
                              Estado: {viaje.estado}
                            </Typography>
                            <Typography variant="body2">
                              Inicio: {viaje.fecha_inicio}
                            </Typography>
                            <Typography variant="body2">
                              Fin: {viaje.fecha_fin}
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

        {/* Columna derecha: Mapa */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Mapa de Lugares Turísticos
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              mb: 2,
            }}
          >
            <Map center={center} zoom={13} width="650px" height="500px">
              {lugares.map((lugar) => {
                const coords = parseCoordinates(lugar.ubicacion);
                return (
                  coords && (
                    <Marker key={lugar.id_lugares_turisticos} anchor={coords} />
                  )
                );
              })}
            </Map>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewRutas;
