import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import React, { useState } from "react";
import AdminBarVehiculo from "./AdminBarVehiculo";

const AdminVehiculo = () => {
  const [data, setData] = useState([]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "transparent",
      }}
    >
      <AdminBarVehiculo />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          p: 6,
          pb: 0,
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Outlet context={{ data, setData }} />
      </Box>
    </Box>
  );
};
export default AdminVehiculo;
