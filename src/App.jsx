import { Box } from "@mui/material";
import SparkleBackground from "./components/SparkleBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          overflow: "hidden",
          background: "linear-gradient(-45deg, #7b1fa2, #e91e63, #ff4081, #ab47bc)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
          color: "#fff",
          fontFamily: "sans-serif",
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

        {/* --- Cinematic Particles & Light Orbs --- */}
        {[...Array(40)].map((_, i) => (
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
        <Box sx={{ position: "relative", zIndex: 10 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/upload" element={<UploadSection />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;










