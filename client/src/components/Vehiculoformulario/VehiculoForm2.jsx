// import React, { useState } from "react";
// import { Box, TextField, Button, Grid, Typography, Paper } from "@mui/material";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import ColorLensIcon from "@mui/icons-material/ColorLens";

// const FormVehiculo2 = ({ onSendAsientos }) => {
//   const [formData, setFormData] = useState({
//     capacidadAsientos: "",
//     tipoTransmision: "",
//     capacidadMaletas: "",
//     anioFabricacion: "",
//     numeroChasis: "",
//     placa: "",
//     color: "",
//     tipoVehiculo: "",
//     combustible: "",
//     motor: "",
//     modelo: "",
//     kilometrajeActual: "",
//     fechaCompra: "",
//     estado: "",
//     marcaVehiculo: "",
//     numeroPasajeros: "",
//     propietario: "",
//     fotos: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     if (type === "number" && value < 0) {
//       return; // Evita números negativos
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSendAsientos = () => {
//     if (formData.capacidadAsientos > 0) {
//       onSendAsientos(formData.capacidadAsientos); // Envía el total de asientos al otro componente
//     } else {
//       alert("Por favor, ingresa un número válido de asientos.");
//     }
//   };

//   const fields = [
//     {
//       label: "Capacidad de Asientos",
//       name: "capacidadAsientos",
//       type: "number",
//     },
//     { label: "Tipo de Transmisión", name: "tipoTransmision", type: "text" },
//     { label: "Capacidad de Maletas", name: "capacidadMaletas", type: "number" },
//     { label: "Año de Fabricación", name: "anioFabricacion", type: "number" },
//     { label: "Número de Chasis", name: "numeroChasis", type: "text" },
//     { label: "Placa", name: "placa", type: "text" },
//     {
//       label: "Color",
//       name: "color",
//       type: "text",
//       adornment: <ColorLensIcon sx={{ color: "#FF6F00" }} />,
//     },
//     { label: "Modelo", name: "modelo", type: "text" },
//     { label: "Kilometraje Actual", name: "kilometrajeActual", type: "text" },
//     { label: "Fecha de Compra", name: "fechaCompra", type: "date" },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           padding: 4,
//           maxWidth: 800,
//           width: "100%",
//           borderRadius: 3,

//           boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//         }}
//       >
//         <Typography
//           variant="h5"
//           component="h2"
//           sx={{
//             mb: 3,
//             fontWeight: "bold",
//             textAlign: "center",
//             borderBottom: "2px solid #FF6F00",
//             color: "#FF6F00",
//             //Naranja,
//           }}
//         >
//           <DirectionsCarIcon
//             sx={{
//               fontSize: 40,
//               color: "#FF6F00",
//             }}
//           />{" "}
//           Registro de Vehículo
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Generar dinámicamente los campos del formulario */}
//           {fields.map((field, index) => (
//             <Grid item xs={12} md={6} key={index}>
//               <TextField
//                 fullWidth
//                 label={field.label}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 type={field.type}
//                 InputProps={
//                   field.adornment
//                     ? { endAdornment: field.adornment }
//                     : undefined
//                 }
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     backgroundColor: "#FFFFFF", //Fondo de entrada
//                     borderRadius: 2,
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#757575",
//                   },
//                   "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#FF6F00",
//                     },
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E0E0E0",
//                   },
//                 }}
//               />
//             </Grid>
//           ))}

//           {/* Botón para agregar asientos */}
//           <Box sx={{ mt: 3, textAlign: "center", width: "100%" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#FF6F00", //Naranja
//                 color: "#FFFFFF",
//                 "&:hover": { backgroundColor: "#E65100" }, //  Hover más oscuro
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 padding: "10px 20px",
//               }}
//               onClick={handleSendAsientos}
//             >
//               Agregar Asientos
//             </Button>
//           </Box>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default FormVehiculo2;
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const categories = [
  {
    key: "capacidadAsientos",
    label: "Asientos",
    icon: <EventSeatIcon />,
    type: "number",
  },
  { key: "tipoTransmision", label: "Transmisión", icon: <DirectionsCarIcon /> },
  { key: "capacidadMaletas", label: "Maletas", icon: <DirectionsCarIcon /> },
  { key: "anioFabricacion", label: "Año", icon: <DirectionsCarIcon /> },
  { key: "numeroChasis", label: "Carrocería", icon: <DirectionsCarIcon /> },
  { key: "placa", label: "Placa", icon: <DirectionsCarIcon /> },
  { key: "color", label: "Color", icon: <ColorLensIcon />, type: "color" },
  { key: "motor", label: "Motor", icon: <DirectionsCarIcon /> },
  { key: "modelo", label: "Modelo", icon: <DirectionsCarIcon /> },
  {
    key: "kilometrajeInicial",
    label: "Kilometraje Inicial",
    icon: <DirectionsCarIcon />,
    type: "number",
  },
  {
    key: "kilometrajeFinal",
    label: "Kilometraje Final",
    icon: <DirectionsCarIcon />,
    type: "number",
  },
];

const colorOptions = [
  { label: "Rojo", value: "#FF0000" },
  { label: "Amarillo", value: "#FFFF00" },
  { label: "Azul", value: "#0000FF" },
  { label: "Verde", value: "#008000" },
];

const ModularDialog = ({ open, title, content, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle
      sx={{
        backgroundColor: "#FF6F00",
        color: "#FFFFFF",
        textAlign: "center",
      }}
    >
      {title}
    </DialogTitle>
    <DialogContent sx={{ padding: 4 }}>{content}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} sx={{ color: "#FF6F00" }}>
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);

const CategoryInput = ({
  category,
  formData,
  handleChange,
  handleColorSelect,
}) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,

        color: "#FF6F00",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h7"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        {category.icon} {category.label}
      </Typography>
      {category.type === "color" ? (
        <Select
          value={formData.color}
          onChange={handleColorSelect}
          fullWidth
          sx={{ mt: 2, backgroundColor: "#FFFFFF", borderRadius: 2 }}
        >
          {colorOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: option.value,
                  borderRadius: "50%",
                  marginRight: 1,
                  display: "inline-block",
                }}
              ></Box>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          label={`Ingrese ${category.label}`}
          name={category.key}
          value={formData[category.key] || ""}
          onChange={handleChange}
          fullWidth
          type={category.type}
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
            },
          }}
        />
      )}
    </Box>
  </Grid>
);

const FormVehiculo2 = ({ onSendAsientos }) => {
  const [formData, setFormData] = useState({
    capacidadAsientos: "",
    tipoTransmision: "",
    capacidadMaletas: "",
    anioFabricacion: "",
    numeroChasis: "",
    placa: "",
    color: "#FFFFFF",
    motor: "",
    modelo: "",
    kilometrajeInicial: 0,
    kilometrajeFinal: 0,
  });

  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    content: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number" && value < 0) {
      return; // Evita números negativos
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorSelect = (e) => {
    setFormData((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const handleSendAsientos = () => {
    if (formData.capacidadAsientos > 0) {
      onSendAsientos(formData.capacidadAsientos);
    } else {
      alert("Por favor, ingresa un número válido de asientos.");
    }
  };

  const handleKilometrajeTotal = () => {
    const kilometrajeTotal =
      formData.kilometrajeFinal - formData.kilometrajeInicial;
    setDialogState({
      open: true,
      title: "Kilometraje Total",
      content: (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Total: {kilometrajeTotal} km
          </Typography>
          <Box>
            <Line
              data={{
                labels: [
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                  "Domingo",
                ],
                datasets: [
                  {
                    label: "Uso de Kilometraje por Día",
                    data: [10, 20, 15, 30, 25, 40, 35],
                    borderColor: "#FF6F00",
                    backgroundColor: "rgba(255, 111, 0, 0.5)",
                  },
                ],
              }}
            />
          </Box>
        </>
      ),
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 1200,
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 4,
            color: "#FF6F00",
            borderBottom: "2px solid #FF6F00",
          }}
        >
          <DirectionsCarIcon /> Registro de Vehículo
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <CategoryInput
              key={category.key}
              category={category}
              formData={formData}
              handleChange={handleChange}
              handleColorSelect={handleColorSelect}
            />
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF6F00",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#E65100" },
              fontWeight: "bold",
              borderRadius: 2,
              padding: "10px 20px",
            }}
            onClick={handleSendAsientos}
          >
            Guardar Vehículo
          </Button>
          <Button
            variant="outlined"
            sx={{
              marginLeft: 2,
              backgroundColor: "#FFFFFF",
              color: "#FF6F00",
              border: "1px solid #FF6F00",
              "&:hover": { backgroundColor: "#FFF3E0" },
              fontWeight: "bold",
              borderRadius: 2,
              padding: "10px 20px",
            }}
            onClick={handleKilometrajeTotal}
          >
            Calcular Kilometraje Total
          </Button>
        </Box>
      </Paper>

      <ModularDialog
        open={dialogState.open}
        title={dialogState.title}
        content={dialogState.content}
        onClose={() =>
          setDialogState({ open: false, title: "", content: null })
        }
      />
    </Box>
  );
};

export default FormVehiculo2;
