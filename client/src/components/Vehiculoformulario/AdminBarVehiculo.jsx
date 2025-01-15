import React, { useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import SpeedIcon from "@mui/icons-material/Speed";
import "../../css/theme.css"; // Asegúrate de que este archivo esté cargado
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HikingIcon from "@mui/icons-material/Hiking";
const lista = [
  {
    iconos: <DirectionsCarIcon />,
    title: "Vehículo",
    sub: [
      {
        icon: <DirectionsCarIcon fontSize="small" />,
        subtitle: "Registro de Vehículo",
        link: "registro",
      },
      {
        icon: <DirectionsCarIcon fontSize="small" />,
        subtitle: "Registro de Componentes",
        link: "formulario",
      },
    ],
  },
  {
    iconos: <HikingIcon />,
    title: "Ruta",
    sub: [
      {
        icon: <HikingIcon fontSize="small" />,
        subtitle: "Registro de Ruta",
        link: "ruta",
      },
    ],
  },
];

const AdminBarVehiculo = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const renderMenuContent = () => (
    <Box
      sx={{
        width: { xs: 280, sm: 280 },
        height: "100%",
        backgroundColor: "#121212",
        borderRight: "1px solid #E0E0E0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Lista del menú */}
      <List component="nav">
        {lista.map((item, index) => (
          <div key={index}>
            <ListItemButton
              onClick={() => handleClick(index)}
              selected={openIndex === index}
              sx={{
                borderLeft: openIndex === index ? "4px solid #FF6F00" : "none",
                borderBottom:
                  openIndex === index ? "none" : "2px solid #FF6F00",
                transition: "all 0.3s",
                ":hover": {
                  backgroundColor: "#1E1E1E",
                },
                color: "#FFC107",
              }}
            >
              <ListItemIcon
                sx={{
                  color: openIndex === index ? "#FF6F00" : "#FFC107",
                }}
              >
                {item.iconos}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: openIndex === index ? "bold" : "normal",
                  color: openIndex === index ? "#FF6F00" : "#FFC107",
                }}
              />
              {item.sub.length > 0 &&
                (openIndex === index ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.sub.map((sub, subIndex) => (
                  <Link
                    to={sub.link}
                    replace
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={subIndex}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        transition: "all 0.3s",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "#FFC107",
                          minWidth: "32px",
                        }}
                      >
                        {sub.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={sub.subtitle}
                        primaryTypographyProps={{
                          fontSize: 14,
                          color: "#FFC107",

                          marginLeft: 2,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ backgroundColor: "#757575" }} />
          </div>
        ))}
      </List>

      {/* Botón de salir */}
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",

            backgroundColor: "#FF6F00",
            color: "#FFFFFF",
            ":hover": {
              backgroundColor: "#D32F2F",
              color: "#FFFFFF",
            },
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Botón para abrir el menú en pantallas pequeñas */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          left: "2%",
          top: "3%",
          display: { xs: "block", md: "none" },
          backgroundColor: "#FF6F00",
          color: "#FFFFFF",
          ":hover": {
            backgroundColor: "#D32F2F",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Menú lateral para pantallas grandes */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {renderMenuContent()}
      </Box>

      {/* Drawer para pantallas pequeñas */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {renderMenuContent()}
      </Drawer>
    </>
  );
};

export default AdminBarVehiculo;
