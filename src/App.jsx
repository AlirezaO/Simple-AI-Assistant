import { Container, Box, Paper, Typography } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <Container
      sx={{
        height: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        "@keyframes wave": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "rgba(30, 30, 30, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #64B5F6, #1976D2, #64B5F6)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              animation: "wave 3s ease infinite",
            }}
          >
            Gemini AI Chat
          </Typography>

          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <ChatInterface />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
