import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import React, { useState } from "react";
import SidebarEmpresa from "../Empresa/SidebarEmpresa";

const PanelEmpresa = () => {
  const [data, setData] = useState([]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "transparent",
      }}
    >
      <SidebarEmpresa />
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
export default PanelEmpresa;
