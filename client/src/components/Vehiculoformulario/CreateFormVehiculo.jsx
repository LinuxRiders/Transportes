import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import FormVehiculo2 from "./VehiculoForm2";
import AsientoVehiculoform from "./AsientoVehiculoform";
import api from "../../api/api";

const steps = [
  { label: "Información del Vehículo" },
  { label: "Detalles del Asiento" },
];

const CreateFormVehiculo = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const [floors, setFloors] = useState([
    {
      rows: 3,
      columns: 3,
      selectedSeats: [],
    },
  ]);
  const [capacidadAsientos, setCapacidadAsientos] = useState(0);

  const handleUpdateCapacidadAsientos = (totalAsientos) => {
    setCapacidadAsientos(totalAsientos);
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

  const handleSaveVehiculo = async () => {
    // Procesar las fotos a JSON
    const processedFotosVehiculo = formData.fotos_vehiculo.map((file) => {
      // Aquí podrías manejar la transformación del archivo a base64 o URL si es necesario.
      // Por ahora, asumiremos que las fotos ya son URLs o tienen un formato adecuado.
      return typeof file === "string" ? file : URL.createObjectURL(file);
    });

    // Preparar los datos finales
    const vehicleData = {
      ...formData,
      capacidad_asientos: capacidadAsientos,
      fotos_vehiculo: JSON.stringify(processedFotosVehiculo), // Convertir fotos a JSON
    };

    try {
      const response = await api.post("/vehiculos", vehicleData);
      const { idvehiculo } = response.data.data;
      alert("Vehículo guardado exitosamente.");
      return idvehiculo;
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
      alert("Error al guardar el vehículo.");
      return null;
    }
  };
  const prepareAsiento = (seat) => {
    return {
      fila: String(seat.row), // Asegúrate de que sea un número entero
      columna: seat.column.charAt(0), // Extrae la columna como un solo carácter
      tipo_asiento: seat.tipo_asiento || "normal", // Valor predeterminado si está vacío
      estado_asiento: seat.estado_asiento || "disponible", // Valor predeterminado si está vacío
      caracteristica: seat.caracteristica || "", // Si no hay características, envía vacío
    };
  };
  const handleSaveAsientos = async (idvehiculo) => {
    if (!idvehiculo) {
      alert("El ID del vehículo es requerido para guardar los asientos.");
      return;
    }

    const preparedData = floors.flatMap((floor) =>
      floor.selectedSeats.map((seat) => prepareAsiento(seat))
    );

    try {
      const response = await api.post(`/asientos/vehicle/${idvehiculo}`, {
        asientos: preparedData,
      });

      const { data } = response;

      if (data) {
        console.log(`Asientos guardados`);
      }
    } catch (error) {
      console.error(
        "Error al guardar asientos",
        error.response?.data || error.message
      );
      alert(
        `Error al guardar el asiento en fila ${asiento.fila} y columna ${asiento.columna}`
      );
    }

    // for (const asiento of preparedData) {
    //   try {
    //     await api.post("/asientos", asiento); // Envía cada asiento de forma individual
    //     console.log(`Asiento guardado:`, asiento);
    //   } catch (error) {}
    // }
  };

  const handleSaveAll = async () => {
    if (!formData) {
      alert("Por favor completa los datos del vehículo.");
      return;
    }

    const idvehiculo = await handleSaveVehiculo(formData);

    if (idvehiculo) {
      await handleSaveAsientos(idvehiculo);
    }
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
            sx={{
              textAlign: "center",
              flex: 1,
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor:
                  index === selectedStep ? "var(--color-primary)" : "lightgray",
                color: "white",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {index + 1}
            </Box>
            <Typography>{step.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Contenido del paso */}
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
        {selectedStep === 0 && (
          <FormVehiculo2 onSave={(data) => setFormData(data)} />
        )}
        {selectedStep === 1 && (
          <AsientoVehiculoform
            floors={floors}
            setFloors={setFloors}
            onUpdateCapacidadAsientos={(totalAsientos) =>
              setCapacidadAsientos(totalAsientos)
            }
          />
        )}
      </Box>

      {/* Controles */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        {selectedStep > 0 && (
          <Button
            variant="contained"
            onClick={handlePreviousStep}
            sx={{ backgroundColor: "#FF6F00" }}
          >
            Atrás
          </Button>
        )}
        {selectedStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNextStep}
            sx={{ backgroundColor: "#FF6F00" }}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSaveAll}
            sx={{ backgroundColor: "#FF6F00" }}
          >
            Guardar Todo
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateFormVehiculo;
