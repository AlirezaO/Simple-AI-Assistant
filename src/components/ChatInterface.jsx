import { useState, useRef, useEffect } from "react";
import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomTextField from "./CustomTextField";
import ChatMessage from "./ChatMessage";
import { sendMessageToGemini } from "../services/geminiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.elements.message?.value;
    if (!input) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: input, isUser: true, name: "You" },
    ]);
    e.target.reset();

    // Show loading state
    setMessages((prev) => [
      ...prev,
      { text: "", isUser: false, isLoading: true, name: "Gemini AI" },
    ]);

    try {
      const response = await sendMessageToGemini(input);

      // Remove loading message and add AI response
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isLoading);
        return [
          ...newMessages,
          { text: response, isUser: false, name: "Gemini AI" },
        ];
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isLoading);
        return [
          ...newMessages,
          {
            text: "Sorry, there was an error processing your request.",
            isUser: false,
            name: "Gemini AI",
          },
        ];
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          mb: 2,
          background: "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
        }}
      >
        {messages.length === 0 ? (
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
              mt: 4,
            }}
          >
            Start a conversation with Gemini AI
          </Typography>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
                alignItems: message.isUser ? "flex-end" : "flex-start",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: message.isUser
                    ? "rgba(76, 175, 80, 0.9)"
                    : "rgba(33, 150, 243, 0.9)",
                  fontWeight: "bold",
                  alignSelf: message.isUser ? "flex-end" : "flex-start",
                }}
              >
                {message.isUser ? "You" : "Gemini AI"}
              </Typography>
              <Paper
                elevation={1}
                sx={{
                  maxWidth: "80%",
                  p: 2,
                  backgroundColor: message.isUser
                    ? "rgba(76, 175, 80, 0.15)"
                    : "rgba(33, 150, 243, 0.15)",
                  borderRadius: message.isUser
                    ? "20px 20px 0 20px"
                    : "20px 20px 20px 0",
                  position: "relative",
                  backdropFilter: "blur(8px)",
                  border: message.isUser
                    ? "1px solid rgba(76, 175, 80, 0.3)"
                    : "1px solid rgba(33, 150, 243, 0.3)",
                }}
              >
                {message.isLoading ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontStyle: "italic",
                      animation: "typing 1.5s steps(3, end) infinite",
                      "@keyframes typing": {
                        "0%": { content: "' '" },
                        "33%": { content: "'.'" },
                        "66%": { content: "'..'" },
                        "100%": { content: "'...'" },
                      },
                    }}
                  >
                    ...
                  </Typography>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <Box sx={{ position: "relative" }}>
                            <Box
                              sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                zIndex: 1,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                              }}
                            >
                              <Tooltip title="Copy code">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      String(children).replace(/\n$/, "")
                                    );
                                  }}
                                  sx={{
                                    color: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.2)",
                                    },
                                  }}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                borderRadius: "8px",
                                padding: "16px",
                                margin: "8px 0",
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </Box>
                        ) : (
                          <code
                            className={className}
                            {...props}
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              padding: "2px 4px",
                              borderRadius: "4px",
                              color: "rgba(0, 0, 255, 0.9)",
                            }}
                          >
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => (
                        <Typography
                          variant="body1"
                          sx={{
                            marginBottom: "16px",
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.89)",
                            fontSize: "1rem",
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h1: ({ children }) => (
                        <Typography
                          variant="h5"
                          sx={{
                            margin: "24px 0 16px",
                            fontWeight: "bold",
                            color: "rgba(255, 255, 255, 0.95)",
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h2: ({ children }) => (
                        <Typography
                          variant="h6"
                          sx={{
                            margin: "20px 0 14px",
                            fontWeight: "bold",
                            color: "rgba(255, 255, 255, 0.9)",
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h3: ({ children }) => (
                        <Typography
                          variant="subtitle1"
                          sx={{
                            margin: "16px 0 12px",
                            fontWeight: "bold",
                            color: "rgba(255, 255, 255, 0.85)",
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      ul: ({ children }) => (
                        <Box
                          component="ul"
                          sx={{
                            margin: "12px 0",
                            paddingLeft: "24px",
                            "& li": {
                              marginBottom: "8px",
                              lineHeight: 1.6,
                              color: "rgb(187, 184, 177)",
                            },
                            "& li::marker": {
                              color: "rgba(133, 200, 245, 0.9)",
                            },
                          }}
                        >
                          {children}
                        </Box>
                      ),
                      ol: ({ children }) => (
                        <Box
                          component="ol"
                          sx={{
                            margin: "12px 0",
                            paddingLeft: "24px",
                            "& li": {
                              marginBottom: "8px",
                              lineHeight: 1.6,
                              color: "rgb(187, 184, 177)",
                              "& ::marker": {
                                color: "red",
                              },
                            },
                          }}
                        >
                          {children}
                        </Box>
                      ),
                      blockquote: ({ children }) => (
                        <Box
                          sx={{
                            borderLeft: "4px solid rgba(33, 150, 243, 0.5)",
                            padding: "8px 16px",
                            margin: "16px 0",
                            backgroundColor: "rgba(33, 150, 243, 0.1)",
                            borderRadius: "0 4px 4px 0",
                            "& p": {
                              margin: 0,
                              color: "rgba(255, 255, 255, 0.8)",
                              fontStyle: "italic",
                            },
                          }}
                        >
                          {children}
                        </Box>
                      ),
                      a: ({ href, children }) => (
                        <Typography
                          component="a"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "rgba(33, 150, 243, 0.9)",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "rgba(33, 150, 243, 1)",
                            },
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      strong: ({ children }) => (
                        <Box
                          component="strong"
                          sx={{
                            fontWeight: "bold",
                            color: "rgba(255, 255, 255, 0.95)",
                          }}
                        >
                          {children}
                        </Box>
                      ),
                      em: ({ children }) => (
                        <Box
                          component="em"
                          sx={{
                            fontStyle: "italic",
                            color: "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          {children}
                        </Box>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                )}
              </Paper>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box
        sx={{
          background: "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          p: 2,
        }}
      >
        <CustomTextField
          onSubmit={handleSubmit}
          placeholder="Type your message..."
        />
      </Box>
    </Box>
  );
};

export default ChatInterface;
