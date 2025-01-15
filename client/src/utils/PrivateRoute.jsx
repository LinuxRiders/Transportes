import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ roles = [], to = "/" }) {
  const { loading, isAuthenticated, user } = useAuth();

  // Mostrar un componente de carga mientras se espera
  if (loading) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un spinner o cualquier otro indicador de carga
  }

  // Redirigir basado en la validación
  if (!isAuthenticated) {
    return <Navigate to={to} replace />;
  }

  if (roles.length > 0 && !roles.some((role) => user.roles.includes(role))) {
    return <Navigate to={to} replace />;
  }

  // Renderiza el contenido de la ruta protegida
  return <Outlet />;
}
