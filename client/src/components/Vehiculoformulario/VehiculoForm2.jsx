import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import api from "../../api/api";

const categories = [
  {
    key: "capacidad_maletas",
    label: "Maletas",
    icon: <DirectionsCarIcon />,
    type: "number",
  },
  {
    key: "anio_fabricacion",
    label: "Año de Fabricacion",
    icon: <DirectionsCarIcon />,
    type: "number",
  },
  {
    key: "num_chasis",
    label: "Chasis",
    icon: <DirectionsCarIcon />,
  },
  {
    key: "placa",
    label: "Placa",
    icon: <DirectionsCarIcon />,
  },
  {
    key: "modelo",
    label: "Modelo",
    icon: <DirectionsCarIcon />,
  },
  {
    key: "kilometraje_actual",
    label: "Kilometraje Actual",
    icon: <DirectionsCarIcon />,
    type: "number",
  },
  {
    key: "fecha_compra",
    label: "Fecha de Compra",
    type: "date",
  },
  {
    key: "estado",
    label: "Estado",
    icon: <DirectionsCarIcon />,
  },
  {
    key: "fotos_vehiculo",
    label: "Fotos del Vehículo",
    icon: <CameraAltIcon />,
    type: "file",
  },
];

const CategoryInput = ({ category, formData, handleChange }) => {
  // Obtener los datos relacionados según el tipo de categoría

  return (
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
        padding: 2,
        color: "#FF6F00",
        width: "100%",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h7"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        {category.icon} {category.label}
      </Typography>

      {category.type === "file" ? (
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleChange(e, category.key)} // Pasar el key del campo
          style={{ marginTop: "16px", width: "200px" }}
        />
      ) : (
        <TextField
          label={`Ingrese ${category.label}`}
          name={category.key}
          value={formData[category.key] || ""}
          onChange={handleChange}
          fullWidth
          type={category.type || "text"}
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
            },
          }}
        />
      )}
    </Grid>
  );
};

const DropdownField = ({
  label,
  name,
  value,
  options,
  handleChange,
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
      <Icon /> {label}
    </Typography>
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
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

const FormVehiculo2 = ({ onSave }) => {
  const [marcas, setMarcas] = useState([]);
  const [tiposCombustible, setTiposCombustible] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState([]);
  const [tiposTransmision, setTiposTransmision] = useState([]);
  const [formData, setFormData] = useState({
    capacidad_maletas: "",
    anio_fabricacion: "",
    num_chasis: "",
    placa: "",
    modelo: "",
    kilometraje_actual: "",
    fecha_compra: "",
    estado: "",
    fotos_vehiculo: [],
    id_marca: "",
    idtransmision: "",
    idtipo_vehiculo: "",
    idcombustible: "",
  });

  //--------------------------------coneccion base de datos vehiculo--------------------------------
  // async function handleAddVehiculo(fields) {
  //   // Validar que todos los campos estén llenos
  //   if (
  //     Object.values(fields).some((value) => value === "" || value === undefined)
  //   ) {
  //     alert("Por favor, llena todos los campos antes de enviar.");
  //     return;
  //   }

  //   try {
  //     // Prepara las imágenes en el formato necesario
  //     const processedFields = {
  //       ...fields,
  //       fotos_vehiculo: JSON.stringify(fields.fotos_vehiculo), // Convertir a JSON si es necesario
  //     };

  //     // Enviar los datos a la API
  //     const response = await api.post("/vehiculos", processedFields);

  //     // Manejo de la respuesta
  //     const { data } = response.data;

  //     if (data) {
  //       alert("Vehículo guardado exitosamente.");
  //       console.log("Datos guardados:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error al guardar el vehículo:", error);
  //     alert("Ocurrió un error al guardar el vehículo. Intenta nuevamente.");
  //   }
  // }
  //--------------------------form-------------------------------------
  useEffect(() => {
    async function getMarcas() {
      try {
        const response = await api.get("/marcas");

        const { data } = response.data;

        setMarcas(data);
      } catch (error) {}
    }

    getMarcas();
  }, []);
  useEffect(() => {
    async function getCombustible() {
      try {
        const response = await api.get("/combustibles/con");

        const { data } = response.data;

        setTiposCombustible(data);
      } catch (error) {}
    }

    getCombustible();
  }, []);
  useEffect(() => {
    async function getTipoVehiculos() {
      try {
        const response = await api.get("/tipos-vehiculo");
        const { data } = response.data;
        setTiposVehiculo(data);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    }
    getTipoVehiculos();
  }, []);
  useEffect(() => {
    async function getTransmision() {
      try {
        const response = await api.get("/transmisiones");

        const { data } = response.data;

        setTiposTransmision(data);
      } catch (error) {}
    }

    getTransmision();
  }, []);

  //-----------------------------------------------------------------------------------

  const handleChange = (e, key) => {
    const { name, value, type, files } = e.target;
    if (type === "number" && value < 0) {
      return; // Evita números negativos
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (key === "fotos_vehiculo") {
      // Si es el campo de imágenes
      const fileArray = Array.from(files); // Convertir archivos a un arreglo
      const fileUrls = fileArray.map((file) => URL.createObjectURL(file)); // URLs temporales
      setFormData((prevData) => ({
        ...prevData,
        [key]: [...(prevData[key] || []), ...fileUrls], // Agregar nuevas imágenes
      }));
    } else {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSave = () => {
    onSave(formData); // Enviar datos al componente principal
  };

  // const handleSendAsientos = () => {
  //   if (formData.capacidadAsientos > 0) {
  //     onSendAsientos(formData.capacidadAsientos);
  //   } else {
  //     alert("Por favor, ingresa un número válido de asientos.");
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        padding: 4,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: 4,
          width: { xs: "320px", md: "100%" },
          background: "var(--color-text-secondary)",
          borderRadius: 3,

          justifyContent: "center",
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
        <Grid container spacing={2}>
          {/* ----------------------------------- */}

          <DropdownField
            label="Marcas"
            name="id_marca"
            value={formData.id_marca}
            options={marcas.map((marca) => ({
              id: marca.id_marca,
              label: marca.marca,
            }))}
            handleChange={handleChange}
            icon={DirectionsCarIcon}
          />
          <DropdownField
            label="Combustible"
            name="idcombustible"
            value={formData.idcombustible}
            options={tiposCombustible.map((combus) => ({
              id: combus.idcombustible,
              label: combus.tipo_combustible,
            }))}
            handleChange={handleChange}
            icon={OilBarrelIcon}
          />
          <DropdownField
            label="Tipo de Vehiculo"
            name="idtipo_vehiculo"
            value={formData.idtipo_vehiculo}
            options={tiposVehiculo.map((vehi) => ({
              id: vehi.idtipo_vehiculo,
              label: vehi.tipo_vehiculo,
            }))}
            handleChange={handleChange}
            icon={DirectionsCarIcon}
          />
          <DropdownField
            label="Tipo de Transmision"
            name="idtransmision"
            value={formData.idtransmision}
            options={tiposTransmision.map((transm) => ({
              id: transm.idtransmision,
              label: transm.tipo_transmision,
            }))}
            handleChange={handleChange}
            icon={AlignVerticalCenterIcon}
          />

          {/* ------------------------- ----------------------------------- */}
          {categories.map((category) => (
            <CategoryInput
              key={category.key}
              category={category}
              formData={formData}
              relatedData={{
                marcas: marcas || [],
                tiposCombustible: tiposCombustible || [],
                tiposVehiculo: tiposVehiculo || [],
                tiposTransmision: tiposTransmision || [],
              }}
              handleChange={handleChange}
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
            onClick={handleSave}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormVehiculo2;
