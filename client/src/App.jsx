import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PasajesBus from "./pages/PasajesBus";
import VisualizarVehiculo from "./components/Admin/VisualizarVehiculo";

import CreateFormVehiculo from "./components/Vehiculoformulario/CreateFormVehiculo";
import VehiculoForm from "./components/Vehiculoformulario/VehiculoForm";
import ReserAsientos from "./components/AsientosView/ReserAsientos";
import RutaForm from "./components/Rutas/RutaForm";
import Paneladmi from "./components/PanelAdmin/Paneladmi";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VisualizarVehiculo />} />;
        <Route path="/pasajes-de-bus" element={<PasajesBus />} />;
        <Route path="/formulario" element={<Paneladmi />}>
          <Route path="registro" element={<CreateFormVehiculo />} />
          <Route path="formulario" element={<VehiculoForm />} />
          <Route path="ruta" element={<RutaForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
