// MyTravels.tsx
import React, { useEffect, useState } from "react";
import { TravelResponse, getMyTravels, createTravel } from "../api/travel";
import Travels from "../components/travel/Travels";
import TravelModal from "../components/travel/AddTravelModal";
import { Box, Button, Typography, Grid, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const MyTravels: React.FC = () => {
  const [travels, setTravels] = useState<TravelResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTravels = async () => {
      if (token) {
        try {
          const data = await getMyTravels(token);
          setTravels(data);
        } catch {
          setError("Failed to fetch travels");
        }
      } else {
        setError("No token provided");
      }
    };

    fetchTravels();
  }, [token]);

  const handleAddTravel = async (travelRequest: any, file: File) => {
    try {
      if (token) {
        const newTravel = await createTravel(travelRequest, file, token);
        setTravels((prev) => [...prev, newTravel]);
      }
      setSnackbarOpen(true);
    } catch (error) {
      setError("Failed to add travel");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box className="container mx-auto p-4">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1">
            Gezilerim
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Yeni Gezi Ekle
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {travels.map((travel) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={travel.id}>
              <Travels travel={travel} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <TravelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTravel}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Travel added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyTravels;
