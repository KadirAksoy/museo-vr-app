// TravelModal.tsx
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (travelRequest: any, file: File) => Promise<void>;
}

const TravelModal: React.FC<TravelModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [travelRequest, setTravelRequest] = useState<{
    title: string;
    description: string;
    travelImageRequest: { content: string };
  }>({
    title: "",
    description: "",
    travelImageRequest: { content: "" },
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "travelContent") {
      setTravelRequest((prev) => ({
        ...prev,
        travelImageRequest: { content: value },
      }));
    } else {
      setTravelRequest((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      await onSubmit(travelRequest, file);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Yeni Gezi Ekle
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Gezi Başlığı"
            name="title"
            value={travelRequest.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Gezi açıklaması"
            name="description"
            value={travelRequest.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Resim içeriği"
            name="travelContent"
            value={travelRequest.travelImageRequest.content}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Gezi Ekle
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TravelModal;
