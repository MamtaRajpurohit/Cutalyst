import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      component="section"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        background: "linear-gradient(-45deg, #7b1fa2, #e91e63, #ff4081, #ab47bc)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
        color: "#fff",
        position: "relative",
        py: 10,
        overflow: "hidden",
      }}
    >
      {/* --- Keyframe Animations --- */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      {/* --- Glass Overlay --- */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          zIndex: 0,
        }}
      />

      {/* --- Floating Particles --- */}
      {[...Array(25)].map((_, i) => (
        <Box
          key={i}
          className="particle"
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

      {/* --- Content --- */}
      <Container sx={{ position: "relative", zIndex: 10 }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #FFEB3B, #FF9800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 15px rgba(255, 152, 0, 0.8)",
          }}
        >
          AI-Powered Video Editing
        </Typography>

        <Typography
          variant="h6"
          mt={2}
          mb={5}
          sx={{
            color: "gray.300",
            opacity: 0.9,
            fontSize: "1.2rem",
            textShadow: "0px 0px 5px rgba(255, 255, 255, 0.3)",
          }}
        >
          Cut, Sync & Subtitle with One Click!
        </Typography>

        {/* --- CTA Button --- */}
        <Box sx={{ position: "relative", zIndex: 20 }}>
          <Button
            variant="contained"
            href="/upload"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #ff9800, #ff5722)",
              color: "white",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.5)",
              transition: "all 0.3s",
              "&:hover": {
                background: "linear-gradient(to right, #ffeb3b, #ff9800)",
                transform: "scale(1.08)",
                boxShadow: "0px 6px 20px rgba(255, 152, 0, 0.7)",
              },
            }}
          >
            Get Started 🚀
          </Button>
        </Box>
      </Container>
    </Box>
  );
}





  
