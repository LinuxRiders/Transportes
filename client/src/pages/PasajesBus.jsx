import React, { useState } from "react";
import VehicleCard from "../components/PasajesBus/VehicleCard";
import FilterColumn from "../components/PasajesBus/FilterColumn";

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Columna de filtros */}
      <FilterColumn onFilterChange={handleFilterChange} />

      {/* Tarjetas de buses */}
      <VehicleCard filters={filters} />
    </div>
  );
};

export default Home;
