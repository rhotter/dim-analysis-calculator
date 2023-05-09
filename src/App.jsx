// import "./App.css";
import React from "react";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Calculator from "./components/Calculator";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 10 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          +/-
        </Typography> */}
        <Calculator />
      </Box>
    </Container>
  );
}

export default App;
