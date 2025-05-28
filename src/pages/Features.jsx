import { Box, Typography, Grid, Container, Card, CardContent } from "@mui/material";
import { VideoLibrary, AutoAwesome, Subtitles, Speed } from "@mui/icons-material";

export default function Features() {
  const features = [
    { icon: <VideoLibrary sx={{ fontSize: 50, color: "#FFEB3B" }} />, title: "Auto Video Editing", desc: "Trim, cut, and sync videos effortlessly with AI precision." },
    { icon: <AutoAwesome sx={{ fontSize: 50, color: "#FF9800" }} />, title: "AI Enhancements", desc: "Enhance video quality, stabilize motion, and adjust colors automatically." },
    { icon: <Subtitles sx={{ fontSize: 50, color: "#D81B60" }} />, title: "Auto Subtitles", desc: "Generate perfectly timed subtitles in multiple languages instantly." },
    { icon: <Speed sx={{ fontSize: 50, color: "#8E24AA" }} />, title: "Lightning Fast Processing", desc: "Process and render high-quality videos in just minutes." }
  ];

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
        py: 10,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* --- Aurora Gradient Animation --- */}
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

      {/* --- Glass Effect Overlay --- */}
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
      {[...Array(30)].map((_, i) => (
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

      {/* --- Page Content --- */}
      <Container sx={{ position: "relative", zIndex: 10 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #FFEB3B, #FF9800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 15px rgba(255, 152, 0, 0.8)",
          }}
        >
          Why Choose Cutalyst? 🚀
        </Typography>

        <Typography variant="h6" color="gray.300" mt={2} mb={5}>
          Experience the power of AI-driven video editing.
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(255, 152, 0, 0.5)",
                  },
                }}
              >
                <CardContent>
                  {feature.icon}
                  <Typography variant="h5" fontWeight="bold" mt={2} mb={1}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="gray.200">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
