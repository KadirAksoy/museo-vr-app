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
