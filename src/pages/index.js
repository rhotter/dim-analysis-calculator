import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Calculator from "../components/Calculator";

export default function Index() {
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
