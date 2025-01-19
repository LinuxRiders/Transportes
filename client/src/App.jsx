import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PasajesBus from "./pages/PasajesBus";

import CreateFormVehiculo from "./components/Vehiculoformulario/CreateFormVehiculo";
import VehiculoForm from "./components/Vehiculoformulario/VehiculoForm";
import ReserAsientos from "./components/AsientosView/ReserAsientos";
import RutaForm from "./components/Rutas/RutaForm";
import Paneladmi from "./components/PanelAdmin/Paneladmi";

import ViewRutas from "./components/Rutas/ViewRutas";
import Login from "./components/Home/Login";
import PrivateRoute from "./utils/PrivateRoute";

import ManageUser from "./components/PanelAdmin/ManageUser";
import Perfil from "./pages/Perfil";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ViewRutas />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/pasajes-de-bus" element={<PasajesBus />} />;
        <Route path="/reserva" element={<ReserAsientos />} />;
        <Route path="/perfil" element={<Perfil />} />;
        <Route element={<PrivateRoute roles={["Admin"]} to="/login" />}>
          <Route path="/manageUser" element={<ManageUser />} />;
          <Route path="/formulario" element={<Paneladmi />}>
            <Route path="registro" element={<CreateFormVehiculo />} />
            <Route path="formulario" element={<VehiculoForm />} />
            <Route path="ruta" element={<RutaForm />} />
            <Route path="vehiculo" element={<VehiculoForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
