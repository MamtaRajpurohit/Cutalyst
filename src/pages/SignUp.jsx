import { Box, Typography, TextField, Button, Container, Paper, Stack, Divider } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

export default function Signup() {
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
      {/* Gradient Animation */}
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

      {/* Glass Panel Signup Form */}
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 10 }}>
      <Paper
        elevation={12}
        sx={{
            p: { xs: 3, sm: 4, md: 5 },
            width: "100%",
            maxWidth: "500px",
            mx: "auto",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0px 6px 25px rgba(255, 255, 255, 0.2)",
        }}
        >

          <Typography variant="h4" fontWeight="bold" mb={2} sx={{
            background: "linear-gradient(to right, #FFEB3B, #FF9800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Join Cutalyst 🚀
          </Typography>

          <Typography variant="body1" color="gray.300" mb={3}>
            Create an account to unlock AI-powered video editing magic.
          </Typography>

          <Stack spacing={2}>
            <TextField
              variant="filled"
              label="Full Name"
              fullWidth
              InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.05)", color: "#fff" } }}
              InputLabelProps={{ style: { color: "#ccc" } }}
            />
            <TextField
              variant="filled"
              label="Email"
              fullWidth
              InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.05)", color: "#fff" } }}
              InputLabelProps={{ style: { color: "#ccc" } }}
            />
            <TextField
              variant="filled"
              label="Password"
              type="password"
              fullWidth
              InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.05)", color: "#fff" } }}
              InputLabelProps={{ style: { color: "#ccc" } }}
            />

            <Button
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
              Sign Up
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
              Sign up with Google
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
