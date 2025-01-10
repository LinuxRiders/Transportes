import React, { useState } from "react";
import "./FilterColumn.css";

const FilterColumn = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    precio: 2000,
    duracion: 12,
    horaSalida: 12,
    horaLlegada: 12,
    servicios: [],
    lugarSalida: [],
    lugarLlegada: [],
  });

  const serviciosDisponibles = [
    "Asiento reclinable 160°",
    "Asiento reclinable 140°",
    "Aire acondicionado",
    "TV",
    "Música",
    "Baños",
    "eTicket",
    "Toma corriente",
    "Cuarto de baño",
    "Puerto USB",
    "Servicios higiénicos",
  ];

  const lugares = ["Terminal Cusco", "Terminal Lima", "Terminal Arequipa"];

  const handleRangeChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (name, value, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value),
    }));
    onFilterChange({
      ...filters,
      [name]: checked
        ? [...filters[name], value]
        : filters[name].filter((item) => item !== value),
    });
  };

  return (
    <div className="filter-column">
      <h3>Filtros</h3>

      {/* Rango de precios */}
      <div className="filter-group">
        <label>Rango de precios</label>
        <div className="single-range-container">
          <input
            type="range"
            min="0"
            max="4000"
            value={filters.precio}
            onChange={(e) =>
              handleRangeChange("precio", Number(e.target.value))
            }
          />
          <span>S/. {filters.precio}</span>
        </div>
      </div>

      {/* Duración */}
      <div className="filter-group">
        <label>Duración (horas)</label>
        <div className="single-range-container">
          <input
            type="range"
            min="0"
            max="24"
            value={filters.duracion}
            onChange={(e) =>
              handleRangeChange("duracion", Number(e.target.value))
            }
          />
          <span>{filters.duracion} h</span>
        </div>
      </div>

      {/* Hora de salida */}
      <div className="filter-group">
        <label>Hora de salida</label>
        <div className="single-range-container">
          <input
            type="range"
            min="0"
            max="24"
            value={filters.horaSalida}
            onChange={(e) =>
              handleRangeChange("horaSalida", Number(e.target.value))
            }
          />
          <span>{filters.horaSalida}:00</span>
        </div>
      </div>

      {/* Hora de llegada */}
      <div className="filter-group">
        <label>Hora de llegada</label>
        <div className="single-range-container">
          <input
            type="range"
            min="0"
            max="24"
            value={filters.horaLlegada}
            onChange={(e) =>
              handleRangeChange("horaLlegada", Number(e.target.value))
            }
          />
          <span>{filters.horaLlegada}:00</span>
        </div>
      </div>

      {/* Servicios */}
      <div className="filter-group">
        <label>Servicios</label>
        <div className="checkbox-dropdown">
          <details>
            <summary>Seleccionar servicios</summary>
            <div className="checkbox-list">
              {serviciosDisponibles.map((servicio) => (
                <div key={servicio}>
                  <input
                    type="checkbox"
                    value={servicio}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "servicios",
                        servicio,
                        e.target.checked
                      )
                    }
                  />
                  <label>{servicio}</label>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* Lugar de salida */}
      <div className="filter-group">
        <label>Lugar de salida</label>
        <div className="checkbox-dropdown">
          <details>
            <summary>Seleccionar lugar de salida</summary>
            <div className="checkbox-list">
              {lugares.map((lugar) => (
                <div key={lugar}>
                  <input
                    type="checkbox"
                    value={lugar}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "lugarSalida",
                        lugar,
                        e.target.checked
                      )
                    }
                  />
                  <label>{lugar}</label>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* Lugar de llegada */}
      <div className="filter-group">
        <label>Lugar de llegada</label>
        <div className="checkbox-dropdown">
          <details>
            <summary>Seleccionar lugar de llegada</summary>
            <div className="checkbox-list">
              {lugares.map((lugar) => (
                <div key={lugar}>
                  <input
                    type="checkbox"
                    value={lugar}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "lugarLlegada",
                        lugar,
                        e.target.checked
                      )
                    }
                  />
                  <label>{lugar}</label>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FilterColumn;
