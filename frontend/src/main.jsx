import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, Typography, LinearProgress, Box } from "@mui/material";
import axios from "axios";

function Root() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    axios.get("/api/kpis")
      .then((res) => {
        setKpis(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", pt: 20 }}>
        <Typography variant="h3" gutterBottom>
           Dashly
        </Typography>
        <Typography variant="h6" gutterBottom>
          Loading your analytics dashboard...
        </Typography>
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  return <App initialKpis={kpis} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
