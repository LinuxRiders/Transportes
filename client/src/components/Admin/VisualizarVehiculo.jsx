import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Button,
} from "@mui/material";
import {
  AirlineSeatReclineNormal,
  Luggage,
  AcUnit,
  DirectionsCar,
  Edit,
  Delete,
  LocalGasStation,
  Settings,
  Commute,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const buttonHover = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;
const VisualizarVehiculo = () => {
  // Datos de los vehículos
  const vehiculos = [
    {
      id: 1,
      modelo: "Mercedes-Benz Sprinter",
      placa: "ABC123",
      color: "Blanco",
      primeraSalida: "16:00 pm",
      ultimaSalida: "23:00 pm",
      duracion: "07h 55m",
      precioDesde: "$29.580",
      asientos: 40,
      tipoAsiento: "Reclinable",
      maletas: 2,
      aireAcondicionado: true,
      tipoVehiculo: "Van",
      transmision: "Automática",
      combustible: "Diesel",
      imagen:
        "https://www.dautos.pe/images/anuncios/fr/juan%20cesar106414-972024-115157-pbFoto1.jpg",
    },
    {
      id: 2,
      modelo: "Ford Transit",
      placa: "DEF456",
      color: "Azul",
      primeraSalida: "14:00 pm",
      ultimaSalida: "21:00 pm",
      duracion: "06h 30m",
      precioDesde: "$25.600",
      asientos: 35,
      tipoAsiento: "Económico",
      maletas: 1,
      aireAcondicionado: false,
      tipoVehiculo: "Minibús",
      transmision: "Manual",
      combustible: "Gasolina",
      imagen:
        "https://cuscotransfers.com/wp-content/uploads/2023/12/Modern-and-Equipped-vans_minibuses-VEHICLES.webp",
    },
    {
      id: 3,
      modelo: "Toyota Yaris",
      placa: "MNO345",
      color: "Plata",
      primeraSalida: "08:00 am",
      ultimaSalida: "18:00 pm",
      duracion: "10h 00m",
      precioDesde: "$18.500",
      asientos: 4,
      tipoAsiento: "Económico",
      maletas: 2,
      aireAcondicionado: false,
      tipoVehiculo: "Sedán",
      transmision: "Automática",
      combustible: "Gasolina",
      imagen:
        "https://photos.encuentra24.com/t_or_fh_l/f_auto/v1/ni/29/25/82/27/29258227_79405c",
    },
    {
      id: 4,
      modelo: "Kia Sorento",
      placa: "YZA334",
      color: "Blanco Perla",
      primeraSalida: "05:30 am",
      ultimaSalida: "21:00 pm",
      duracion: "15h 30m",
      precioDesde: "$37.500",
      asientos: 6,
      tipoAsiento: "Premium",
      maletas: 5,
      aireAcondicionado: true,
      tipoVehiculo: "SUV",
      transmision: "Automática",
      combustible: "GLP",
      imagen: "https://www.lapulga.com.do/f/7172500-1.jpg",
    },
    {
      id: 5,
      modelo: "Kia Soluto",
      placa: "PQR678",
      color: "Negro",
      primeraSalida: "07:30 am",
      ultimaSalida: "19:00 pm",
      duracion: "11h 30m",
      precioDesde: "$20.000",
      asientos: 4,
      tipoAsiento: "Reclinable",
      maletas: 1,
      aireAcondicionado: true,
      tipoVehiculo: "Sedán",
      transmision: "Manual",
      combustible: "Gasolina",
      imagen:
        "https://www.clasificar.com/pa/files/10-2024/ad4242/kia-soluto-611647530_large.webp",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", color: "#f4f4f4" }}>
      {/* Encabezado */}
      <AppBar
        position="static"
        sx={{
          height: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://travel1tours.com/wp-content/uploads/2024/02/transportes-cusco.jpg"
          alt="Encabezado"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7)",
          }}
        />
        <Toolbar
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#cc5800",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
                md: "2.5rem",
              },
            }}
          >
            TRANSPORTE TURÍSTICO - VEHÍCULOS DISPONIBLES
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Barra de ordenamiento */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          backgroundColor: "#cc5800",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
              md: "1.1rem",
            },
          }}
        >
          Total: {vehiculos.length} vehículos
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: {
              xs: "5px",
              sm: "8px",
              md: "12px",
            },
          }}
        >
          {["Relevancia", "Precio", "Duración"].map((label) => (
            <Button
              key={label}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "#d4d4d4",
                textTransform: "none",
                fontWeight: "500",
                padding: "6px 16px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#a0a0a0",
                  color: "black",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Contenido principal */}
      <Container
        sx={{
          padding: "30px",
          marginTop: "20px",
          animation: `${fadeIn} 0.8s ease-in-out`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            marginBottom: "30px",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Lista de Vehículos
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
              paddingTop: "10px",
              borderTop: "2px solid #FF6F00",
            }}
          ></Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            alignItems: "center",
          }}
        >
          {vehiculos.map((vehiculo) => (
            <Box
              key={vehiculo.id}
              sx={{
                width: "100%",
                padding: "20px",
                backgroundColor: "#1E1E1E",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "20px", // Espaciado entre los bbys
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              {/* Contenedor horizontal principal */}
              <Box
                sx={{
                  display: "flex", // Mantiene horizontal
                  flexDirection: { xs: "column", sm: "row" },
                  gap: "20px",
                  width: "100%",
                }}
              >
                {/* Imagen del Vehículo */}
                <Box
                  component="img"
                  src={vehiculo.imagen}
                  alt={`Imagen de ${vehiculo.modelo}`}
                  sx={{
                    width: { xs: "100%", sm: "280px" },
                    height: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                {/*INICIO de contenedor Estructural*/}
                <Box
                  sx={{
                    display: "flex", // Mantiene vertical
                    flexDirection: "column",
                    width: "100%",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex", // Mantiene horizontal
                      flexDirection: { xs: "column", sm: "row" },
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    {/* Primera sección */}
                    <Grid
                      container
                      spacing={2}
                      sx={{ flex: 1, paddingTop: "3%" }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            marginBottom: "10px",
                            color: "#FF6F00",
                            fontWeight: "bold",
                          }}
                        >
                          {vehiculo.modelo}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#f4f4f4" }}>
                          <strong>Placa:</strong> {vehiculo.placa}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#f4f4f4" }}>
                          <strong>Color:</strong> {vehiculo.color}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Segunda sección */}
                    <Grid
                      container
                      spacing={2}
                      sx={{ flex: 1, paddingTop: "3%" }}
                    >
                      <Grid item xs={12}>
                        <Typography sx={{ fontSize: "14px", color: "#f4f4f4" }}>
                          <strong>Primera salida:</strong>{" "}
                          {vehiculo.primeraSalida}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#f4f4f4" }}>
                          <strong>Última salida:</strong>{" "}
                          {vehiculo.ultimaSalida}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#f4f4f4" }}>
                          <strong>Duración:</strong> {vehiculo.duracion}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#FF6F00",
                            fontWeight: "bold",
                          }}
                        >
                          Desde: {vehiculo.precioDesde}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Tercera sección */}
                    <Grid
                      container
                      spacing={2}
                      sx={{ flex: 1, paddingTop: "3%" }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <AirlineSeatReclineNormal
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Asientos:</strong> {vehiculo.asientos}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <DirectionsCar
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Tipo:</strong> {vehiculo.tipoAsiento}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <Luggage
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Maletas:</strong> {vehiculo.maletas}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: vehiculo.aireAcondicionado
                              ? "#4caf50"
                              : "#f44336",
                          }}
                        >
                          <AcUnit
                            sx={{
                              marginRight: "5px",
                              color: vehiculo.aireAcondicionado
                                ? "#4caf50"
                                : "#f44336",
                            }}
                          />
                          <strong>Aire:</strong>{" "}
                          {vehiculo.aireAcondicionado ? "Sí" : "No"}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Cuarta sección */}
                    <Grid
                      container
                      spacing={2}
                      sx={{ flex: 1, paddingTop: "3%" }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <Commute
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Tipo:</strong> {vehiculo.tipoVehiculo}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <Settings
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Transmisión:</strong> {vehiculo.transmision}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            color: "#f4f4f4",
                          }}
                        >
                          <LocalGasStation
                            sx={{ marginRight: "5px", color: "#FF6F00" }}
                          />
                          <strong>Combustible:</strong> {vehiculo.combustible}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* Contenedor auxiliar debajo */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: "20px",
                      padding: "5px",
                      backgroundColor: "#292929",
                      borderRadius: "8px",
                      boxShadow: "inset 0 0 10px rgba(62, 62, 62, 0.5)",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Button
                      variant="outlined"
                      startIcon={<Edit sx={{ color: "#FF6F00" }} />}
                      sx={{
                        color: "#f4f4f4",
                        borderColor: "#FF6F00",
                        "&:hover": {
                          animation: `${buttonHover} 0.2s forwards`,
                          backgroundColor: "rgba(255, 111, 0, 0.1)",
                        },
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Delete sx={{ color: "#f44336" }} />}
                      sx={{
                        color: "#f4f4f4",
                        borderColor: "#f44336",
                        "&:hover": {
                          animation: `${buttonHover} 0.2s forwards`,
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      Borrar
                    </Button>
                  </Box>
                </Box>
                {/*FIN de contenedor Estructural*/}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default VisualizarVehiculo;
