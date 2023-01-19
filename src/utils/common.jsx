import { Box, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
