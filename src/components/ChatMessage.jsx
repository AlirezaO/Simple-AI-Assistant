import { Box, Typography, Paper } from "@mui/material";

const ChatMessage = ({ message, isUser, isLoading, name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          mb: 0.5,
          fontSize: "0.75rem",
        }}
      >
        {name}
      </Typography>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          backgroundColor: isUser
            ? "rgba(33, 150, 243, 0.1)"
            : "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${
            isUser ? "rgba(33, 150, 243, 0.3)" : "rgba(255, 255, 255, 0.1)"
          }`,
          borderRadius: "12px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            [isUser ? "right" : "left"]: "-8px",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            [isUser ? "borderLeft" : "borderRight"]: `8px solid ${
              isUser ? "rgba(33, 150, 243, 0.1)" : "rgba(255, 255, 255, 0.05)"
            }`,
          },
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Typography
              sx={{
                color: "white",
                animation: "pulse 1s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 0.4 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.4 },
                },
              }}
            >
              ...
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              color: "white",
              wordBreak: "break-word",
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
