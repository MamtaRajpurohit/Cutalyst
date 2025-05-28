import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
  } from "@mui/material";
  import {
    Movie as MovieIcon,
    Timeline as TimelineIcon,
    CloudUpload as UploadIcon,
    AutoAwesome as MagicIcon,
  } from "@mui/icons-material";
  
  export default function Dashboard() {
    const stats = [
      {
        icon: <UploadIcon sx={{ fontSize: 40, color: "#FFEB3B" }} />,
        label: "Videos Uploaded",
        value: "128",
      },
      {
        icon: <MagicIcon sx={{ fontSize: 40, color: "#FF9800" }} />,
        label: "AI Enhancements",
        value: "87",
      },
      {
        icon: <TimelineIcon sx={{ fontSize: 40, color: "#D81B60" }} />,
        label: "Subtitles Generated",
        value: "230",
      },
      {
        icon: <MovieIcon sx={{ fontSize: 40, color: "#8E24AA" }} />,
        label: "Projects Completed",
        value: "54",
      },
    ];
  
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
          color: "#fff",
          py: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
  
        {/* --- Glass Background Overlay --- */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            zIndex: 0,
          }}
        />
  
        {/* --- Floating Particles --- */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            className="particle"
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              animation: `float ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          />
        ))}
  
        {/* --- Dashboard Content --- */}
        <Container sx={{ zIndex: 10 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
            sx={{
              textAlign: "center",
              background: "linear-gradient(to right, #FFEB3B, #FF9800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 12px rgba(255, 255, 255, 0.3)",
            }}
          >
            Welcome Back, Creator 💫
          </Typography>
  
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    p: 3,
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 24px rgba(255, 255, 255, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        margin: "0 auto 10px",
                        bgcolor: "transparent",
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" color="gold" mt={1}>
                      {stat.value}
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
  

  
