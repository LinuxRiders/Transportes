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
import RutaForm2 from "./components/Rutas/RutaForm2";
import RutaForm3 from "./components/Rutas/RutaForm3";
import ViewRutas from "./components/Rutas/ViewRutas";
import Login from "./components/Home/Login";
import PrivateRoute from "./utils/PrivateRoute";
import PanelUsuario from "./components/PanelAdmin/PanelUsuario";
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
            <Route path="categoria-y-ruta" element={<RutaForm />} />
            <Route path="rutas" element={<RutaForm2 />} />
            <Route path="lugar-turistico" element={<RutaForm3 />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
