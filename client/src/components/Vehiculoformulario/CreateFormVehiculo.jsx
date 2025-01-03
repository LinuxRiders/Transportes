import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import "../../css/theme.css"; // Asegúrate de que este archivo esté cargado correctamente
import FormVehiculo2 from "./VehiculoForm2";
import AsientoVehiculoform from "./AsientoVehiculoform";

const steps = [
  { label: "Información del Vehiculo" },
  { label: "Detalles del Asiento" },
];

const CreateFormVehiculo = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [totalAsientos, setTotalAsientos] = useState(0);

  const handleSendAsientos = (capacidadAsientos) => {
    setTotalAsientos(capacidadAsientos);
  };

  const handleNextStep = () => {
    if (selectedStep < steps.length - 1) {
      setSelectedStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (selectedStep > 0) {
      setSelectedStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (index) => {
    setSelectedStep(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        mt: 4,
        p: 2,
        pb: 10,
        overflow: "hidden",
      }}
    >
      {/* Contenedor de los pasos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "800px",
          mb: 2,
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            onClick={() => handleStepClick(index)}
            sx={{
              textAlign: "center",
              flex: 1,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                right: index < steps.length - 1 ? "-10px" : "auto",
                left: index > 0 ? "-10px" : "auto",
                width: index < steps.length - 1 ? "calc(100% + 20px)" : "0",
                height: "2px",
                backgroundColor:
                  index < selectedStep
                    ? "var(--color-primary)"
                    : "var(--color-border-300)",
                zIndex: -1,
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor:
                  index === selectedStep
                    ? "var(--color-primary)"
                    : "var(--color-border-300)",
                color: "var(--color-background-100)",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem",
                },
                color:
                  index === selectedStep
                    ? "var(--color-primary)"
                    : "var(--color-text-primary-700)",
              }}
            >
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/*  ======== CONTENIDO DE CADA PASO ==========  */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        {/* -- PASO 1: INFORMACIÓN -- */}
        <Box
          sx={{
            display: selectedStep === 0 ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <FormVehiculo2 onSendAsientos={handleSendAsientos} />
        </Box>

        {/* -- PASO 2: DETALLES DEL PRODUCTO -- */}
        <Box
          sx={{
            display: selectedStep === 1 ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <AsientoVehiculoform totalAsientos={totalAsientos} />
        </Box>
      </Box>

      {/* ======== Controles de Pasos ========== */}
      <Box
        item
        xs={12}
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            display: selectedStep === 0 ? "none" : "flex",
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-text-primary)",
            "&:hover": {
              backgroundColor: "var(--color-secondary-700)",
            },
          }}
          onClick={handlePreviousStep}
        >
          Retroceder
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-text-primary)",
            "&:hover": {
              backgroundColor: "var(--color-secondary-700)",
            },
          }}
          onClick={selectedStep === 1 ? "" : handleNextStep}
        >
          {selectedStep === 1 ? "Guardar Tour" : "Siguiente"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateFormVehiculo;
