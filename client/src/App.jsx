import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VisualizarVehiculo from "./components/Admin/VisualizarVehiculo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VisualizarVehiculo />} />;
      </Routes>
    </>
  );
}

export default App;
