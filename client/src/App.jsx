import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PasajesBus from "./pages/PasajesBus";
import VisualizarVehiculo from "./components/Admin/VisualizarVehiculo";
import AdminVehiculo from "./components/Vehiculoformulario/AdminVehiculo";
import CreateFormVehiculo from "./components/Vehiculoformulario/CreateFormVehiculo";
import VehiculoForm from "./components/Vehiculoformulario/VehiculoForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VisualizarVehiculo />} />;
        <Route path="/pasajes-de-bus" element={<PasajesBus />} />;
        <Route path="/formulario" element={<AdminVehiculo />}>
          <Route path="registro" element={<CreateFormVehiculo />} />
          <Route path="formulario" element={<VehiculoForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
