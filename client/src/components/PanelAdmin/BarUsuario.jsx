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
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

// Lista simplificada de opciones para el usuario
const userOptions = [
  {
    iconos: <AccountCircleIcon />,
    title: "Agregar Vehículo",
    sub: [
      {
        icon: <AccountCircleIcon fontSize="small" />,
        subtitle: "Formulario Vehículo",
        link: "formularioVehiculo",
      },
    ],
  },
  {
    iconos: <AccountCircleIcon />,
    title: "Agregar Rutas",
    sub: [
      {
        icon: <AccountCircleIcon fontSize="small" />,
        subtitle: "Rutas",
        link: "rutas",
      },
    ],
  },
];

const BarUsuario = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Definición de colores
  const backgroundColor = "#121212"; // Fondo oscuro
  const primaryColor = "#FF6F00"; // Color de acento para selección
  const secondaryColor = "#FFC107"; // Color secundario
  const hoverColor = "#1E1E1E"; // Color de hover

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
        backgroundColor: backgroundColor,
        color: secondaryColor,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Lista de navegación */}
      <List component="nav" sx={{ flexGrow: 1, px: 1 }}>
        {userOptions.map((item, index) => (
          <Box key={index} mb={1}>
            <ListItemButton
              onClick={() => handleClick(index)}
              selected={openIndex === index}
              sx={{
                backgroundColor:
                  openIndex === index ? primaryColor + "20" : hoverColor,
                borderLeft:
                  openIndex === index
                    ? `4px solid ${primaryColor}`
                    : "4px solid transparent",
                borderRadius: 2,
                transition: "all 0.3s",
                ":hover": { backgroundColor: primaryColor + "10" },
                color: secondaryColor,
                boxShadow:
                  openIndex === index ? `0 2px 4px ${primaryColor}40` : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  color: openIndex === index ? primaryColor : secondaryColor,
                  minWidth: 40,
                }}
              >
                {item.iconos}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {item.sub.length > 0 &&
                (openIndex === index ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.sub.map((subItem, subIndex) => (
                  <Link
                    to={subItem.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={subIndex}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: hoverColor,
                        mt: 0.5,
                        borderRadius: 1,
                        transition: "background-color 0.3s",
                        ":hover": { backgroundColor: primaryColor + "20" },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: secondaryColor, minWidth: 32 }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.subtitle} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>
            <Divider sx={{ backgroundColor: "#b58904", my: 1 }} />
          </Box>
        ))}
      </List>

      {/* Botón de Cerrar Sesión */}
      <Box p={2}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            backgroundColor: primaryColor,
            color: "#FFFFFF",
            ":hover": { backgroundColor: "#D32F2F" },
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
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
          backgroundColor: primaryColor,
          color: "#FFFFFF",
          ":hover": { backgroundColor: "#D32F2F" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Menú lateral para pantallas grandes */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {renderMenuContent()}
      </Box>

      {/* Drawer para pantallas pequeñas */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {renderMenuContent()}
      </Drawer>
    </>
  );
};

export default BarUsuario;
