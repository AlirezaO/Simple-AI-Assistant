import { TextField, Button, Box } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";

const CustomTextField = ({ onSubmit, placeholder = "Type something..." }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          name="message"
          label={placeholder}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196F3",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2196F3",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            minWidth: "auto",
            px: 2,
            background: "linear-gradient(45deg, #2196F3, #00BCD4)",
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2, #0097A7)",
            },
          }}
        >
          <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
};

export default CustomTextField;
