import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { GitHub, LinkedIn, Instagram, Email } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #8E24AA, #D81B60, #F06292)",
        backgroundSize: "300% 300%",
        animation: "footerPulse 10s ease infinite",
        color: "white",
        py: 6,
      }}
    >

{/* Blur Overlay */}
<Box
  sx={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    zIndex: 1,
  }}
/>

{/* Floating Particles (AFTER the blur) */}
{[...Array(12)].map((_, i) => (
  <Box
    key={i}
    className="footer-particle"
    sx={{
      position: "absolute",
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 4}px`,
      height: `${Math.random() * 6 + 4}px`,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite`,
      zIndex: 2,
      boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
    }}
  />
))}
      {/* Gradient Glow Background Blur */}
      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent)",
          borderRadius: "50%",
          transform: "translateX(-50%)",
          filter: "blur(100px)",
          opacity: 0.5,
          zIndex: 0,
        }}
      />


      {/* Animations */}
      <style>
        {`
          @keyframes footerPulse {
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

      <Container sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #FFEB3B, #FF9800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 12px rgba(255, 152, 0, 0.7)",
            mb: 2,
          }}
        >
          Cutalyst
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "rgba(255,255,255,0.8)" }}>
          Empowering creators to edit effortlessly with AI ✨
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <IconButton
            href="https://github.com/"
            target="_blank"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#FFEB3B",
                transform: "scale(1.2)",
              },
            }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://linkedin.com/"
            target="_blank"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#00B0FF",
                transform: "scale(1.2)",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://instagram.com/"
            target="_blank"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#F48FB1",
                transform: "scale(1.2)",
              },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            href="mailto:hello@cutalyst.com"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#FF9800",
                transform: "scale(1.2)",
              },
            }}
          >
            <Email />
          </IconButton>
        </Stack>

        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
          © {new Date().getFullYear()} Cutalyst. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}






  