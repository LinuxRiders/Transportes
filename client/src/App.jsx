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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ViewRutas />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/pasajes-de-bus" element={<PasajesBus />} />;
        {/* <Route
          element={<PrivateRoute roles={["Admin"]} to="/pasajes-de-bus" />}
        > */}
        <Route path="/formulario" element={<Paneladmi />}>
          <Route path="registro" element={<VehiculoForm />} />
          <Route path="categoria-y-ruta" element={<RutaForm />} />
          <Route path="lugar-turistico" element={<RutaForm3 />} />
        </Route>
        <Route
          element={<PrivateRoute roles={["Admin"]} to="/pasajes-de-bus" />}
        >
          <Route path="/formularioUsuario" element={<PanelUsuario />}>
            <Route path="formularioVehiculo" element={<CreateFormVehiculo />} />
            <Route path="rutas" element={<RutaForm2 />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
