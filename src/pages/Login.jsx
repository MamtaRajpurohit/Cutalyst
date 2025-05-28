import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Divider,
    Stack,
  } from "@mui/material";
  import { Google as GoogleIcon } from "@mui/icons-material";
  import { useState } from "react";
  
  export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Login Data:", formData);
      // Firebase/backend login logic here
    };
  
    return (
      <Box
        component="section"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "linear-gradient(-45deg, #7b1fa2, #e91e63, #ff4081, #ab47bc)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
  
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              animation: `float ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          />
        ))}
  
        {/* Glass Login Panel */}
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 10 }}>
          <Paper
            elevation={12}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0px 6px 25px rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={2}
              sx={{
                background: "linear-gradient(to right, #FFEB3B, #FF9800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back ✨
            </Typography>
  
            <Typography variant="body1" color="gray.300" mb={3}>
              Log in to your Cutalyst Account
            </Typography>
  
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="filled"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
  
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="filled"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
  
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.5,
                    background: "linear-gradient(to right, #FF9800, #FFEB3B)",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "30px",
                    boxShadow: "0px 4px 20px rgba(255, 235, 59, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(to right, #F57C00, #FBC02D)",
                    },
                  }}
                >
                  Login
                </Button>
  
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }}>or</Divider>
  
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.3)",
                    borderRadius: "30px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "#fff",
                    },
                  }}
                >
                  Continue with Google
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    );
  }
  
  
  
  